import express from "express";
import bodyParser from "body-parser"
import configViewEngine from "./config/viewEngine"
import 'dotenv/config'
import initWebRoutes from "./route/web"
import connectDB from "./config/connectDB"

const app = express();

app.use(bodyParser.urlencoded({ extended: true }))
// parse application/json
app.use(bodyParser.json())

configViewEngine(app)
initWebRoutes(app)

connectDB();

const PORT = process.env.PORT || 8888 // neu port dau chua duoc cap lay port sau
app.listen(PORT, () => {
    console.log("Server is running at port " + PORT)
})