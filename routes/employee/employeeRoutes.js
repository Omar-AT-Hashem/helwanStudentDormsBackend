import { Router } from "express"

import login from "./handlers/login.js"
import register from "./handlers/register.js"
import students from "./handlers/students.js"

const employeeRoutes = Router()



employeeRoutes.use("/login", login)
employeeRoutes.use("/register", register)
employeeRoutes.use("/students", students)


export default employeeRoutes

