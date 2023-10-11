import { Router } from "express"

import register from "./handlers/register.js"
import login from "./handlers/login.js"

const studentRoutes = Router()



studentRoutes.use("/register", register)
studentRoutes.use("/login", login)


export default studentRoutes