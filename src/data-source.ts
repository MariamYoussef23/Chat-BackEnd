import { config } from "dotenv";
import { DataSource } from "typeorm"
import "reflect-metadata"


config();
export const AppDataSource = new DataSource ({
    type: "postgres",
    host: process.env.Host,
    port: +process.env.DBPort!,
    username: process.env.User,
    password: process.env.Password,
    database: process.env.DatabaseName,
    synchronize: true, 
    logging: true,
    entities: [],
    migrations: ['migration/*.ts'],
    subscribers: [],

})