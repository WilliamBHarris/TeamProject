require("dotenv").config();
const express = require("express");
const app = express();
const dbConnection = require('./db')
const controllers = require("./controllers");


app.use(express.json())


dbConnection
  .authenticate()
  .then(() => dbConnection.sync())
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`[Server]: App is listening on PORT: ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log(`[Server]: Server crashed. Error = ${err}`);
  });