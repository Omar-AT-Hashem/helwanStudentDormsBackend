import { Router } from "express"

import register from "./handlers/register.js"

const studentRoutes = Router()



studentRoutes.use("/register", register)



export default studentRoutes