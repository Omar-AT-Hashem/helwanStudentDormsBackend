import { Router } from "express";

import instruction from "./handlers/instruction.js";
import applicationDate from "./handlers/applicationDate.js";
import student from "./handlers/student.js";
import employee from "./handlers/employee.js";
import login from "./handlers/login.js";
import category from "./handlers/category.js";
import housing from "./handlers/housing.js";
import bed from "./handlers/bed.js";
import building from "./handlers/building.js";
import floor from "./handlers/floor.js";
import room from "./handlers/room.js";
import town from "./handlers/town.js";
import penalty from "./handlers/penalty.js";
import blockmeals from "./handlers/blockmeals.js";
import fee from "./handlers/fee.js";

const generalRoutes = Router();

generalRoutes.use("/instruction", instruction);
generalRoutes.use("/application-date", applicationDate);
generalRoutes.use("/category", category);
generalRoutes.use("/student", student);

generalRoutes.use("/employee", employee);
generalRoutes.use("/login", login);

//------------------ Start Housing Routes --------------------

generalRoutes.use("/town", town);
generalRoutes.use("/building", building);
generalRoutes.use("/floor", floor);
generalRoutes.use("/room", room);
generalRoutes.use("/bed", bed);
generalRoutes.use("/housing", housing);

//------------------ End Housing Routes -----------------------

generalRoutes.use("/fee", fee);
generalRoutes.use("/penalty", penalty);
generalRoutes.use("/blockmeals", blockmeals);

export default generalRoutes;
