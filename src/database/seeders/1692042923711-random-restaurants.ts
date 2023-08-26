import { faker } from '@faker-js/faker';
import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import Restaurant from '../../entities/restaurant.entity';
import Category from '../../entities/category.entity';
import RestaurantProfile from '../../entities/restaurant-profile.entity';

const categoryList = ["中東料理", "日本料理", "義式餐廳", "美式", "酒吧", "咖啡"];
const generateCount = 24;

export default class RandomRestaurants1692042923711 implements Seeder {
    track = false;

    public async run(dataSource: DataSource): Promise<any> {
        await this.seedCategory(dataSource);

        for (let i = 0; i < generateCount; i++) {
            await this.seedRandomOne(dataSource);
        }
    }

    private async seedCategory(dataSource: DataSource) {
        const repoCategory = dataSource.getRepository(Category);

        for (const category of categoryList) {
            let targetCategory = await repoCategory.findOne({ where: { name: category } });

            if (!targetCategory) {
                targetCategory = repoCategory.create({ name: category });
                await repoCategory.save(targetCategory);
            }
        }
    }

    private async seedRandomOne(dataSource: DataSource) {
        const repoCategory = dataSource.getRepository(Category);
        const repoRest = dataSource.getRepository(Restaurant);
        const repoProfile = dataSource.getRepository(RestaurantProfile);

        const rest = repoRest.create();
        rest.name = faker.commerce.productName().substring(0, 19);
        rest.nameEn = rest.name;
        rest.image = faker.image.urlLoremFlickr({ width: 320, height: 240, category: "food" });
        rest.rating = faker.number.float({ min: 0.0, max: 5.0, precision: 0.1 });

        const categoryName = categoryList[faker.number.int({ min: 0, max: categoryList.length - 1 })];
        const category = await repoCategory.findOne({ where: { name: categoryName } });

        const profile = repoProfile.create();
        profile.description = faker.commerce.productDescription();
        profile.googleMap = "https://goo.gl/maps/ZRN3e1aaVzS3PfYB6";
        profile.location = faker.location.streetAddress();
        profile.phone = faker.phone.number("## #### ####");

        rest.category = category as Category;
        await repoRest.save(rest);

        profile.restaurant = rest;
        await repoProfile.save(profile);
    }
}