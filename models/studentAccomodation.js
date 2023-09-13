import { Sequelize, DataTypes } from "sequelize";
import { db } from "../config/db.js";

export let StudentAccomodation;

  StudentAccomodation = db.define(
    "studentAccomodation",
    {
      
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      studentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'students', 
          key: 'id'
      }
      },
      buildingNumber: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      room: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      bed: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      residenceDate: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      evacuationDate: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      evacuationType: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      evacuationReason: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      fileNumber: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );

  await StudentAccomodation.sync({ force: true });
