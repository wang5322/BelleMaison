const express = require("express");
const router = express.Router();
const FavoriteController = require("../controllers/favorite_controller");

router.post("/", FavoriteController.setFavorite);

module.exports = router;
