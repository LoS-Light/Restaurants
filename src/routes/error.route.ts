import { ErrorRequestHandler } from 'express';
import { FLASH_ACTION_ERROR, FLASH_TEXT_ERROR } from '../defs/flash.def';
import { Config } from '../env.config';

export const ErrorRoute: ErrorRequestHandler = (err: Error, req, res, next) => {
    if (Config.nodeEnv !== 'production') {
        console.log(err.stack);
    }
    req.flash(FLASH_ACTION_ERROR, FLASH_TEXT_ERROR);
    res.redirect('/index');
}