import dotenv from "dotenv"
dotenv.config({ path: "./.env" })
import { dbConnection } from "./db/connectDB.js"

import express from "express"
import cors from "cors"
import router from "./Routes/index.js"

import multer from "multer"



const app = express()
dbConnection()

app.use(cors())// allows  requests, from another domain, protocol, or port
app.use(express.json()) //parses incoming requests with JSON payload.



app.use("/api/v1", router)




app.listen(process.env.PORT || 3001, () => {
    console.log("Server is running at : ", process.env.PORT || 3001)
})


