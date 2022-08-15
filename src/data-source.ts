import { config } from "dotenv";
import { DataSource } from "typeorm";
import "reflect-metadata";
import { User } from "./entities/user";
import { Chat } from "./entities/chat";
import { Message } from "./entities/message";

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
  entities: [User, Chat, Message],
  migrations: ["migration/*.ts"],
  subscribers: [],
});
