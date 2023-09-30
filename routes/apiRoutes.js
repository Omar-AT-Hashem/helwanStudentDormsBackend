import { Router } from "express"

import employeeRoutes from "./employee/employeeRoutes.js"
import studentRoutes from "./student/studentRoutes.js"
import generalRoutes from "./general/generalRoutes.js"

const apiRoutes = Router()


apiRoutes.use("/employee", employeeRoutes)
apiRoutes.use("/student", studentRoutes)
apiRoutes.use("/general", generalRoutes)

export default apiRoutes
