const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const colorProductController = require("../controllers/colorProductController");

const router = express.Router();
// router.use(authMiddleware.protect);

router.get("/", colorProductController.getAllColorProducts);
router.post("/", colorProductController.createColorProduct);
router.get("/:id", colorProductController.getColorProductById);
router.delete("/:id", colorProductController.deleteColorProductById);
router.put("/:id", colorProductController.updateColorProductById);
router.get("/get-name/:name", colorProductController.getColorProductByName);
router.get("/get-code/:code", colorProductController.getColorProductByCode);

module.exports = router;
