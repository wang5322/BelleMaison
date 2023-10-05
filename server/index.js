//server
const express = require("express");
const app = express();
const cors = require("cors");

//this middleware(express.json()) will automatically parse the JSON data and make it available as an object in the request.body property.
app.use(express.json());
app.use(cors()); //allows cross-origin HTTP request

const db = require("./models");

//Routers
// const userRouter = require("./routes/Users");
// app.use("/user", userRouter);
const propertyRouter = require("./routes/Properties");
app.use("/property", propertyRouter);

//sequelize will first sync the models with the database, if the table does not exist,
//it will create the table according to the files in models folder then connect the server
db.sequelize.sync().then(() => {
  app.listen(3001, () => {
    console.log("Server running on 3001.");
  });
});
