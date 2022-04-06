const express = require('express')


const configViewEngine = (app) => {
    app.use(express.static("./src/public"))
    app.set("view engine", "ejs")
    app.set("views", "./src/views") // path tinh tu thu muc doc (nodejs) k phai tu thu muc hien tai config
}

module.exports = configViewEngine;