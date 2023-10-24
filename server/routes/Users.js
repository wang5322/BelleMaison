const express = require("express");
const router = express.Router();
const userController = require("../controllers/user_controller");
const s3Middleware = require("../middlewares/s3UploadMiddleware");
const { validateToken } = require("../middlewares/AuthMiddleware");

router.post("/", userController.add);
router.post("/login", userController.getUserByEmail);

router.post('/send_recovery_email' , userController.recoverEmail);

router.get("/", userController.getAll);

router.get("/checkemail/:email", userController.checkEmailExist);

router.get("/auth", validateToken, userController.getAuth);

//get broker that has only been approved
router.get("/byRole/broker", s3Middleware, userController.getUserByRole);

//get broker info with id from params
router.get("/brokerInfo/:id", s3Middleware, userController.getByIdParam);

router.get("/byId", validateToken, s3Middleware, userController.getById);

router.patch("/byId", validateToken, userController.update);

router.patch("/resetpass",  userController.resetPassword);
//admin approve broker and soft delete user
router.patch("/admin/update", validateToken, userController.approve);
module.exports = router;
