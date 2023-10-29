import { Router } from "express"

import instruction from "./handlers/instruction.js"
import applicationDate from "./handlers/applicationDate.js"
import student from "./handlers/student.js"
import employee from "./handlers/employee.js"
import login from "./handlers/login.js"
import category from "./handlers/category.js"

const generalRoutes = Router()



generalRoutes.use("/instruction", instruction)
generalRoutes.use("/application-date", applicationDate)
generalRoutes.use("/category", category)
generalRoutes.use("/student", student)
generalRoutes.use("/employee", employee)
generalRoutes.use("/login", login)


export default generalRoutes