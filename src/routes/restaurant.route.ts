import express from 'express';
import RestaurantService from '../services/restaurant.service';
import { IRestaurant } from '../interfaces/IRestaurant';
import asyncCatch from '../middlewares/asyncCatch.middleware';
import { check } from 'express-validator';

export const RestaurantRoute = express.Router();
const restService = new RestaurantService();

// Validation
const validCheck = check('**').trim().blacklist('<>&;=()\"\'');

// View
RestaurantRoute.get(['/', '/index', '/index.html'], (req, res) => res.redirect('/restaurants'));

RestaurantRoute.get('/restaurants', validCheck, asyncCatch(async (req, res) => {
    const keyword = req.query.keyword as string;
    const rests = await (keyword ?
        restService.getRestsByKeyword(keyword) : restService.getRestaurants());

    res.render('index', { rests });
}));

RestaurantRoute.get('/restaurants/new', validCheck, asyncCatch(async (req, res) => {
    const rest = { rating: 3 } as IRestaurant;
    const editTitle = "餐廳建立";
    const action = `/restaurants/new?_method=POST`;
    res.render('edit', { editTitle, action, rest });
}));

RestaurantRoute.get('/restaurants/:id', validCheck, asyncCatch(async (req, res) => {
    const id = Number(req.params.id);
    const rest = await restService.getRestById(id);

    if (rest) {
        res.render('show', { rest });
        return;
    }
    res.redirect('/index');
}));

RestaurantRoute.get('/restaurants/:id/edit', validCheck, asyncCatch(async (req, res) => {
    const id = Number(req.params.id);
    const rest = await restService.getRestById(id);
    const editTitle = "餐廳編輯";
    const action = `/restaurants/${id}?_method=PUT`;

    if (rest) {
        res.render('edit', { editTitle, action, rest });
        return;
    }
    res.redirect('/index');
}));

// ----------------------------------------------------------------------

// Api
RestaurantRoute.post('/restaurants/new', validCheck, asyncCatch(async (req, res) => {
    const data = {} as IRestaurant;
    mapRestDataFromBody(data, req.body);
    await restService.createRestaurant(data);
    res.redirect('/index');
}));

RestaurantRoute.put('/restaurants/:id', validCheck, asyncCatch(async (req, res) => {
    const data = { id: Number(req.params.id) } as IRestaurant;
    mapRestDataFromBody(data, req.body);
    await restService.updateRestaurant(data);
    res.redirect('/index');
}));

RestaurantRoute.delete('/restaurants/:id', validCheck, asyncCatch(async (req, res) => {
    const id = Number(req.params.id);
    await restService.deleteRestaurant(id);
    res.redirect('/index');
}));

// ----------------------------------------------------------------------

// Func
function mapRestDataFromBody(data: IRestaurant, body: Record<string, any>) {
    data.name = body["rest-name"];
    data.nameEn = body["rest-name-en"];
    data.category = body["rest-category"];
    data.image = body["rest-image"];
    data.location = body["rest-location"];
    data.phone = body["rest-phone"];
    data.googleMap = body["rest-google-map"];
    data.rating = body["rest-rating"];
    data.description = body["rest-description"];
}