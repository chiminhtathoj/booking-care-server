import express from "express";
import bodyParser from "body-parser"
import configViewEngine from "./config/viewEngine"
import 'dotenv/config'
import initWebRoutes from "./route/web"
import connectDB from "./config/connectDB"

const app = express();

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', process.env.REACT_URL);

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.use(bodyParser.urlencoded({ extended: true }))
// parse application/json
app.use(bodyParser.json())
const whitelist = ['http://localhost:3000/', 'http://example2.com']
configViewEngine(app)
initWebRoutes(app)

connectDB();

const PORT = process.env.PORT || 8888 // neu port dau chua duoc cap lay port sau
app.listen(PORT, () => {
    console.log("Server is running at port " + PORT)
})