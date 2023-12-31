import express, { Application } from 'express';
import { Config, DbMysqlConfig, SessionConfig } from './env.config';
import { MainRoute } from './routes/main.route';
import { DbMysql } from './database/data-source.mysql';
import { engine } from 'express-handlebars';

import methodOverride from 'method-override';
import session from 'express-session';
import flash from 'connect-flash';


const main = async () => {
    const port = Config.port;
    const app: Application = express();

    await debugConfigs();
    await initDbMysql();

    app.engine('.hbs', engine({ extname: '.hbs' }));
    app.set('view engine', '.hbs');
    app.set('views', `${__dirname}/web/views`);

    app.use(express.static(`${__dirname}/web`));
    app.use(express.urlencoded({ extended: true }));
    app.use(methodOverride('_method'));

    app.set('trust proxy', Config.trustProxy) // trust first proxy
    app.use(session(SessionConfig));
    app.use(flash());
    app.use(MainRoute);

    app.listen(port, () => { console.log('-> Listening on port ' + port); });
}

async function debugConfigs() {
    if (Config.nodeEnv !== 'production') {
        console.log("Config:", Config);
        console.log("DbMysqlConfig:", DbMysqlConfig);
        console.log("SessionConfig:", SessionConfig);
    }
}

async function initDbMysql() {
    await DbMysql.initialize();
    console.log('-> Database mysql connection established');
}

main();