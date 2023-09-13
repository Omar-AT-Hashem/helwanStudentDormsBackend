import { Sequelize, DataTypes } from "sequelize";
import { db } from "../config/db.js";

export let Employee;

  Employee = db.define(
    "employee",
    {
      
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );

  await Employee.sync({ alter: true });
