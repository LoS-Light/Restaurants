
import { DbMysql } from "../database/data-source.mysql";
import Restaurant from "../entities/restaurant.entity";
import Category from "../entities/category.entity";
import { FindManyOptions, FindOptionsOrder, FindOptionsRelations, FindOptionsWhere, Like } from "typeorm";
import { IRestaurant, IRestaurantSearchOptions } from "../interfaces/restaurant.interface";
import RestaurantProfile from "../entities/restaurant-profile.entity";

export default class RestaurantService {

    private repoCategory = DbMysql.getRepository(Category);
    private repoRest = DbMysql.getRepository(Restaurant);
    private repoProfile = DbMysql.getRepository(RestaurantProfile);

    public async getRests(options: IRestaurantSearchOptions) {
        if (options.keyword) {
            return await this.getRestsByKeyword(options);
        }
        else {
            return await this.getRestsByOptions(options, {});
        }
    }

    public async getRestsByKeyword(options: IRestaurantSearchOptions) {
        const isCategory = await this.repoCategory.exist({ where: { name: options.keyword } });
        if (isCategory) {
            return await this.getRestsByCategory(options);
        }
        else {
            return await this.getRestsByName(options);
        }
    }

    public async getRestsByCategory(options: IRestaurantSearchOptions) {
        const optionsWhere: FindOptionsWhere<Restaurant> = {
            category: { name: options.keyword }
        }
        return await this.getRestsByOptions(options, optionsWhere);
    }

    public async getRestsByName(options: IRestaurantSearchOptions) {
        const optionsWhere: FindOptionsWhere<Restaurant> = {
            name: Like(`%${options.keyword}%`)
        }
        return await this.getRestsByOptions(options, optionsWhere);
    }

    public async getRestById(id: number) {
        if (isNaN(id)) return null;

        return await this.repoRest.findOne({
            relations: { category: true, profile: true },
            where: { id: id }
        });
    }

    public async createRest(data: IRestaurant) {
        const rest = this.repoRest.create();
        const profile = this.repoProfile.create();
        await this.saveRest(data, rest, profile);
    }

    public async updateRest(data: IRestaurant) {
        const rest = await this.getRestById(data.id) as Restaurant;
        if (rest) await this.saveRest(data, rest, rest.profile);
    }

    public async deleteRest(id: number) {
        if (isNaN(id)) return;

        const rest = await this.getRestById(id) as Restaurant;
        if (rest) {
            await this.repoProfile.delete(rest.profile.id);
            await this.repoRest.remove(rest);
        }
    }

    private async saveRest(data: IRestaurant, rest: Restaurant, profile: RestaurantProfile) {
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

    private async getGroupCount(countPerGroup: number, optionsWhere: FindOptionsWhere<Restaurant>) {
        const findOptions = { where: optionsWhere };
        return Math.ceil(await this.repoRest.count(findOptions) / countPerGroup);
    }

    private async getRestsByOptions(options: IRestaurantSearchOptions, optionsWhere: FindOptionsWhere<Restaurant>) {
        const findOptions: FindManyOptions<Restaurant> = {
            order: this.getOptionsOrder(options.orderType),
            relations: this.getOptionsRelation(options.orderType),
            where: optionsWhere,
            skip: options.offset,
            take: options.limit
        }
        const groupCount = await this.getGroupCount(options.limit, optionsWhere);
        const rests = await this.repoRest.find(findOptions);
        return { rests, groupCount };
    }

    private getOptionsOrder(orderType: number): FindOptionsOrder<Restaurant> {
        switch (orderType) {
            case 2: return { name: "DESC" };
            case 3: return { category: { name: "ASC" } };
            case 4: return { profile: { location: "ASC" } };
            default: return { name: "ASC" };
        }
    }

    private getOptionsRelation(orderType: number): FindOptionsRelations<Restaurant> {
        switch (orderType) {
            case 4: return { category: true, profile: true };
            default: return { category: true };
        }
    }
}