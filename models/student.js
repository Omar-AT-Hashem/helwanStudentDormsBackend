import { Sequelize, DataTypes } from "sequelize";
import { db } from "../config/db.js";

export let Student;

  Student = db.define(
    "student",
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
      image: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      nationalNumber: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      fileNumber: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      studentCode: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      religion: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      telephone: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      mobile: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      fatherName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      fatherOccupation: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      fatherNationalNumber: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      fatherPhone: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      guardianName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      guardianNationalNumber: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      guardianRelationShip: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      placeOfResidency: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      faculty: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      gradeAssessment: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      gradePercentage: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      accomodationType: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      familyAbroad: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      acceptanceStatus: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      accomodationWithNutrition: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },    
    },
    {
      timestamps: false,
    }
  );

  await Student.sync({ alter: true });