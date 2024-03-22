import Express from "express"
import cors from "cors"
import dotenv from "dotenv"
import conn from "./config/db.js"

import apiRoutes from "./routes/apiRoutes.js"

dotenv.config()

const app = Express()

app.use(cors())
app.use(Express.json())
app.use(Express.urlencoded({extended: true}))

app.use("/api", apiRoutes)

app.get('/', (req, res) => {
    res.send("server running")
})


const PORT = process.env.PORT || 4211 


app.listen(PORT, () => {
    console.log("Server is running...");
    console.log(`Port: ${PORT}`);
})



