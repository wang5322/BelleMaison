//server
const express = require("express");
const app = express();
const cors = require("cors");

require("dotenv").config();

//this middleware(express.json()) will automatically parse the JSON data and make it available as an object in the request.body property.
app.use(express.json());
app.use(cors()); //allows cross-origin HTTP request

const db = require("./models");

//Routers
const userRouter = require("./routes/Users");
app.use("/api/users", userRouter);
const propertyRouter = require("./routes/Properties");
app.use("/api/property", propertyRouter);
const pictureRouter = require("./routes/Pictures");
app.use("/api/picture", pictureRouter);

//sequelize will first sync the models with the database, if the table does not exist,
//it will create the table according to the files in models folder then connect the server
db.sequelize.sync().then(() => {
  app.listen(3005, () => {
    console.log("======Server running on 3005.============");
  });
});
