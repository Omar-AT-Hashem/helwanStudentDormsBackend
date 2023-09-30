import { Router } from "express"

import employeeRoutes from "./employee/employeeRoutes.js"
import studentRoutes from "./student/studentRoutes.js"

const apiRoutes = Router()


apiRoutes.use("/employee", employeeRoutes)
apiRoutes.use("/student", studentRoutes)

export default apiRoutes
