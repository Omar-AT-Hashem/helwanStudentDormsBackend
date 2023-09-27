import mysql from "mysql-await";
import dotenv from "dotenv";

dotenv.config();

const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

const conn = mysql.createConnection({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
});

conn.connect((err) => {
  if (err) {
    console.log(err);
    return;
  }

  console.log("DB connection successful");
});

export default conn;