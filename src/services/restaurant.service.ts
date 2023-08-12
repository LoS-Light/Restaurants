
import { DbMysql } from "../database/data-source.mysql";
import Restaurant from "../entities/restaurant.entity";
import Category from "../entities/category.entity";
import { Like } from "typeorm";
import { IRestaurant } from "../interfaces/restaurant.interface";
import RestaurantProfile from "../entities/restaurant-profile.entity";

export default class RestaurantService {

    private repoCategory = DbMysql.getRepository(Category);
    private repoRest = DbMysql.getRepository(Restaurant);
    private repoProfile = DbMysql.getRepository(RestaurantProfile);

    public async getRestsByKeyword(keyword: string) {
        const isCategory = await this.repoCategory.exist({ where: { name: keyword } });
        if (isCategory) {
            return await this.getRestsByCategory(keyword);
        }
        else {
            return await this.getRestsByName(keyword);
        }
    }

    public async getRestsByCategory(keyword: string) {
        return await this.repoRest.find({
            order: { id: "ASC" },
            relations: { category: true },
            where: { category: { name: keyword } }
        });
    }

    public async getRestsByName(keyword: string) {
        return await this.repoRest.find({
            order: { id: "ASC" },
            where: { name: Like(`%${keyword}%`) }
        });
    }

    public async getRestById(id: number) {
        if (isNaN(id)) return null;

        return await this.repoRest.findOne({
            relations: { category: true, profile: true },
            where: { id: id }
        });
    }

    public async getRestaurants() {
        return await this.repoRest.find({
            order: { id: "ASC" },
            relations: { category: true }
        });
    }

    public async createRestaurant(data: IRestaurant) {
        const rest = this.repoRest.create();
        const profile = this.repoProfile.create();
        await this.saveRestaurant(data, rest, profile);
    }

    public async updateRestaurant(data: IRestaurant) {
        const rest = await this.getRestById(data.id) as Restaurant;
        if (rest) await this.saveRestaurant(data, rest, rest.profile);
    }

    public async deleteRestaurant(id: number) {
        if (isNaN(id)) return;

        const rest = await this.getRestById(id) as Restaurant;
        if (rest) {
            await this.repoProfile.delete(rest.profile.id);
            await this.repoRest.remove(rest);
        }
    }

    private async saveRestaurant(data: IRestaurant, rest: Restaurant, profile: RestaurantProfile) {
        const category = await this.repoCategory.findOne({
            where: { name: data.category }
        }) as Category;

        rest.category = category;
        rest.name = data.name;
        rest.nameEn = data.nameEn;
        rest.image = data.image;
        rest.rating = data.rating;
        rest = await this.repoRest.save(rest);

        profile.location = data.location;
        profile.phone = data.phone;
        profile.googleMap = data.googleMap;
        profile.description = data.description;
        profile.restaurant = rest;

        await this.repoProfile.save(profile);
    }
}