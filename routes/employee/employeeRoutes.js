import { Router } from "express"

import login from "./handlers/login.js"
import students from "./handlers/students.js"
import register from "./handlers/register.js"

const employeeRoutes = Router()



employeeRoutes.use("/register", register)
employeeRoutes.use("/login", login)
employeeRoutes.use("/students", students)


export default employeeRoutes

