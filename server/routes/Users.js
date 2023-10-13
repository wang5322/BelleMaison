const express = require("express");
const router = express.Router();
const userController = require("../controllers/user_controller");
const s3Middleware = require("../middlewares/s3UploadMiddleware");

router.post("/", userController.add);

router.get("/auth", userController.getAuth);

router.get("/byRole/broker", s3Middleware, userController.getUserByRole);

router.post("/login", userController.getUserByEmail);

router.get("/:id", userController.getById);
// router.put("/byId/:id", userController.update);

module.exports = router;
