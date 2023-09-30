import { Router } from "express"

import instructions from "./handlers/instructions.js"
import applicationDates from "./handlers/applicationDates.js"

const generalRoutes = Router()



generalRoutes.use("/instructions", instructions)
generalRoutes.use("/application-dates", applicationDates)



export default generalRoutes