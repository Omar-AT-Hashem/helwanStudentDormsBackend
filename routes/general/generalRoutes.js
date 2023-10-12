import { Router } from "express"

import instruction from "./handlers/instruction.js"
import applicationDate from "./handlers/applicationDate.js"
import student from "./handlers/student.js"
import employee from "./handlers/employee.js"

const generalRoutes = Router()



generalRoutes.use("/instruction", instruction)
generalRoutes.use("/application-date", applicationDate)
generalRoutes.use("/student", student)
generalRoutes.use("/employee", employee)


export default generalRoutes