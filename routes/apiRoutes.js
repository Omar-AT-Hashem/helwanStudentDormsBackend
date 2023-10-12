import { Router } from "express"

import generalRoutes from "./general/generalRoutes.js"

const apiRoutes = Router()


apiRoutes.use("/api", generalRoutes)

export default apiRoutes
