import { Router } from "express"

import login from "./handlers/login.js"

const employeeRoutes = Router()



employeeRoutes.use("/login", login)


export default employeeRoutes

