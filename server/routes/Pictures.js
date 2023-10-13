const express = require("express");
const router = express.Router();
const pictureController = require("../controllers/picture_controller");
const uploadImageMemory = require("../middlewares/MulterMiddleware");
const s3Middleware = require("../middlewares/s3UploadMiddleware");

router.post("/", uploadImageMemory, s3Middleware, pictureController.add);

router.get("/byProp/:id", s3Middleware, pictureController.getByProp);

router.get("/byBroker/:id", pictureController.getByBroker);

router.delete("/:id", s3Middleware, pictureController.delete);

module.exports = router;
