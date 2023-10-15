const express = require("express");
const router = express.Router();
const FavoriteController = require("../controllers/favorite_controller");
const s3Middleware = require("../middlewares/s3UploadMiddleware");
const { validateToken } = require("../middlewares/AuthMiddleware");

router.post("/", validateToken,  FavoriteController.setFavorite);

router.get("/", validateToken, s3Middleware, FavoriteController.getFavorite);


module.exports = router;
