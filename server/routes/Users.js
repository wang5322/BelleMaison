const express = require("express");
const router = express.Router();
const userController = require("../controllers/user_controller");

router.post("/", userController.add);

router.get("/auth", userController.getAuth);

router.post("/login", userController.getUserByEmail);

router.get("/:id", userController.getById);
// router.put("/byId/:id", userController.update);

module.exports = router;