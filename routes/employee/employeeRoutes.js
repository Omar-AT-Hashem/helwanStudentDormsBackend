import { Router } from "express"

import login from "./handlers/login.js"
import register from "./handlers/register.js"

const employeeRoutes = Router()



employeeRoutes.use("/login", login)
employeeRoutes.use("/register", register)


export default employeeRoutes

