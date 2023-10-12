const express = require("express");
const router = express.Router();
const propertyController = require("../controllers/property_controller");
const { validateToken } = require("../middlewares/AuthMiddleware");

router.post("/", validateToken, propertyController.add);

router.get("/", propertyController.getAll);

router.get("/byId/:id", propertyController.getById);

router.patch("/byId/:id", propertyController.toggleActive);

router.put("/byId/:id", propertyController.update);

module.exports = router;
