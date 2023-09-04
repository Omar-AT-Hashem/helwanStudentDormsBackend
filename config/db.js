import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();
export let db;

const { DB_NAME, DB_USER, DB_PASSWORD, DB_HOST } = process.env;

  db = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    dialect: "mysql",
    logging: false,
  });

  try {
    await db.authenticate();
    console.log(
      "-----Database Connection has been established successfully.-----"
    );
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }

