import express from 'express';
import { RestaurantRoute } from './restaurant.route';
import { ErrorRoute } from './error.route';

export const MainRoute = express.Router();

MainRoute.use(RestaurantRoute);
MainRoute.use(ErrorRoute);