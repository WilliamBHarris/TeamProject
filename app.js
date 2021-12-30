require("dotenv").config();
const express = require("express");
const app = express();
const dbConnection = require('./db')
const controllers = require("./controllers");


app.use("/Schedule", controllers.scheduleController); // Make sure to use the correct Capitalization to match the folder name
app.use("/User", controllers.userController); // Make sure to use the correct Capitalization to match the folder name
app.use(express.json())
app.use(require("./middleware/headers"));
app.use("/User", controllers.userController); // Make sure to use the correct Capitalization to match the folder name
app.use("/Schedule", controllers.scheduleController);


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