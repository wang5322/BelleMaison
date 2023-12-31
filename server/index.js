//server
const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

//this middleware(express.json()) will automatically parse the JSON data and make it available as an object in the request.body property.
app.use(express.json());

//allows cross-origin HTTP request
app.use(cors()); 

const db = require("./models");

//Routers
const userRouter = require("./routes/Users");
app.use("/api/users", userRouter);
const propertyRouter = require("./routes/Properties");
app.use("/api/properties", propertyRouter);
const pictureRouter = require("./routes/Pictures");
app.use("/api/pictures", pictureRouter);

const favoriteRouter = require("./routes/Favorites");
app.use("/api/favorites", favoriteRouter);

//sequelize will first sync the models with the database, if the table does not exist,
//it will create the table according to the files in models folder then connect the server
db.sequelize.sync().then(() => {
  app.listen(process.env.PORT || 3005, () => {
    console.log("======Server running on 3005.============");
  });
}).catch((err) => {
  console.log(err);
});
