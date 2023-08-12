import express from 'express';
import { RestaurantRoute } from './restaurant.route';

export const MainRoute = express.Router();

MainRoute.use(RestaurantRoute);