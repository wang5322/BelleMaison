const express = require("express");
const router = express.Router();
const pictureController = require("../controllers/picture_controller");
const uploadImageMemory = require("../middlewares/MulterMiddleware");
const uploadTwoImages = require("../middlewares/MulterOriginThumb");
const s3Middleware = require("../middlewares/s3UploadMiddleware");

router.post("/", uploadImageMemory, s3Middleware, pictureController.add);

//add thumbnail
router.post(
  "/addThumbnail",
  uploadImageMemory,
  s3Middleware,
  pictureController.addThumb
);

//Upload two pictures at once, use in the future
router.post(
  "/addOriginThumb",
  uploadTwoImages,
  s3Middleware,
  pictureController.addOriginThumb
);

router.get("/byProp/:id", s3Middleware, pictureController.getByProp);

router.get("/byBroker/:id", s3Middleware, pictureController.getByBroker);

router.delete("/:id", s3Middleware, pictureController.delete);

module.exports = router;
