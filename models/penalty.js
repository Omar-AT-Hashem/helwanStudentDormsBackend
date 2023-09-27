// import { Sequelize, DataTypes } from "sequelize";
// import { db } from "../config/db.js";

// export let Penalty;

// Penalty = db.define(
//   "penalty",
//   {
//     id: {
//       type: DataTypes.INTEGER,
//       autoIncrement: true,
//       primaryKey: true,
//     },
//     studentId: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       references: {
//         model: "students",
//         key: "id",
//       },
//     },
//     penaltyType: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     reason: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     date: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//   },
//   {
//     timestamps: false,
//   }
// );

