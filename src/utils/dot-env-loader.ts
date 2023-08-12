import { configDotenv } from 'dotenv';

if (!process.env.NODE_ENV) {
    process.env.NODE_ENV = 'development';
}

const env = process.env.NODE_ENV;
const envFile = `./env/.env.${env}.local`;

console.log(`-> Environment: ${env}`);

configDotenv({ path: envFile, debug: true });