import { Router } from "express"

import generalRoutes from "./general/generalRoutes.js"

const apiRoutes = Router()


apiRoutes.use("/v1", generalRoutes)

export default apiRoutes
