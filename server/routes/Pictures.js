const express = require("express");
const router = express.Router();
const pictureController = require("../controllers/picture_controller");
const uploadImageMemory = require("../middlewares/MulterMiddleware");
const s3Middleware = require("../middlewares/s3UploadMiddleware");

router.post("/", uploadImageMemory, s3Middleware, pictureController.add);

router.get("/", s3Middleware, pictureController.getAll);

// router.get("/byId/:id", pictureController.getById);

// router.delete("/byId/:id", pictureController.delete);

module.exports = router;
