import express from 'express';
import { RestaurantRoute } from './restaurant.route';
import { ErrorRoute } from './error.route';
import { check } from 'express-validator';

export const MainRoute = express.Router();

// Validation
const validCheck = check('**').trim().blacklist('<>()\"\'');

MainRoute.use(validCheck, RestaurantRoute);
MainRoute.use(ErrorRoute);