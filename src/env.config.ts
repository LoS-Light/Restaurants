import './utils/dot-env-loader';

import { SessionOptions } from 'express-session';
import { DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';

// Configs
export const Config: { readonly nodeEnv: string, readonly port: number } = {
    nodeEnv: process.env.NODE_ENV as string,
    port: Number(process.env.PORT)
}

export const DbMysqlConfig: DataSourceOptions & SeederOptions = {
    type: 'mysql',
    host: process.env.DB_MYSQL_HOST as string,
    port: Number(process.env.DB_MYSQL_PORT),
    database: process.env.DB_MYSQL_DATABASE as string,
    username: process.env.DB_MYSQL_USERNAME as string,
    password: process.env.DB_MYSQL_PASSWORD as string,
    entities: JSON.parse(process.env.DB_MYSQL_ENTITIES as string),
    migrations: JSON.parse(process.env.DB_MYSQL_MIGRATIONS as string),
    seeds: JSON.parse(process.env.DB_MYSQL_SEEDS as string),
    logging: JSON.parse(process.env.DB_MYSQL_LOGGING as string)
}

export const SessionConfig: SessionOptions = {
    secret: process.env.SESSION_SECRET as string,
    resave: JSON.parse(process.env.SESSION_RESAVE as string),
    saveUninitialized: JSON.parse(process.env.SESSION_SAVE_UNINITIALIZED as string),
    cookie: JSON.parse(process.env.SESSION_COOKIE as string)
}