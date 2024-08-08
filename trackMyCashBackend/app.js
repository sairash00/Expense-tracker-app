import express from "express"
import cors from 'cors'
import cookieParser from 'cookie-parser'


const app = express()
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended: true})); 
app.use(express.static("public"))


import router from "./src/routes/user.route.js"

app.use("/api/v1/users", router)

export default app
