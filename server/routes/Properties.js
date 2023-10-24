const express = require("express");
const router = express.Router();
const propertyController = require("../controllers/property_controller");
const { validateToken } = require("../middlewares/AuthMiddleware");
const s3Middleware = require("../middlewares/s3UploadMiddleware");

router.post("/", validateToken, propertyController.add);

router.get("/", s3Middleware, propertyController.getAll);

router.get("/search", s3Middleware, propertyController.getAllSearch);

router.get("/byId/:id", propertyController.getById);

router.patch("/byId/:id", propertyController.toggleActive);

router.put("/byId/:id", propertyController.update);

router.get(
  "/byBroker",
  validateToken,
  s3Middleware,
  propertyController.getByBroker
);

module.exports = router;
