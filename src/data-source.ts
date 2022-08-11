import { config } from "dotenv";
import { DataSource } from "typeorm";
import "reflect-metadata";
import { User } from "./entities/user";

config();
export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.Host,
  port: +process.env.DBPort!,
  username: process.env.User,
  password: process.env.Password,
  database: process.env.DatabaseName,
  synchronize: true,
  logging: false,
  entities: [User],
  migrations: ["migration/*.ts"],
  subscribers: [],
});
