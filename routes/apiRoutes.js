import { Router } from "express"

import employeeRoutes from "./employee/employeeRoutes.js"

const apiRoutes = Router()


apiRoutes.use("/employee", employeeRoutes)

export default apiRoutes
