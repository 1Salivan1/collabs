import { Sequelize } from "sequelize";
import "dotenv/config";

const db = new Sequelize({
  dialect: "postgres",
  host: process.env.HOST,
  username: process.env.USER,
  password: process.env.PASSWORD,
  port: process.env.PORT ? Number(process.env.PORT) : 5432,
  database: process.env.DATABASE,
  logging: false,
});

export default db;
