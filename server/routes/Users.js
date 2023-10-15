const express = require("express");
const router = express.Router();
const userController = require("../controllers/user_controller");
const s3Middleware = require("../middlewares/s3UploadMiddleware");
const { validateToken } = require("../middlewares/AuthMiddleware");

router.post("/", userController.add);

router.get("/auth", validateToken, userController.getAuth);

router.get("/byRole/broker", s3Middleware, userController.getUserByRole);

router.post("/login", userController.getUserByEmail);

// router.get("/:id", validateToken, s3Middleware, userController.getById);
router.get("/byId", validateToken, s3Middleware, userController.getById);

router.patch("/byId", validateToken, userController.update);

module.exports = router;
