const express = require('express');
const winston = require('winston');

const app = express();

const controller = require("./src/controller/controller");
controller.Scrap()

winston.add(new winston.transports.File({
    filename: "./res/log/info.log",
    level: "info"
}));
winston.add(new winston.transports.File({
    filename: "./res/log/error.log",
    level: "error",
    handleExceptions: true,
    handleRejections: true
}));

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>{
    winston.log("info", `This app is started at port ${PORT}`)
});
