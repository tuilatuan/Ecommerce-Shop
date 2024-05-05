const express = require("express");
// const authMiddleware = require("../middlewares/authMiddleware");
const productController = require("../controllers/productController");

const router = express.Router();
// router.use(authMiddleware.protect);

const { upload, uploadMultiple } = require(`../middlewares/multer`);

router.get("/", productController.getAllProducts);

router.post("/create", upload, productController.handleProductCreation);

router.get("/:slug", productController.getProductBySlug);
router.get("/:id", productController.getProductById);
router.delete("/:id", productController.deleteProductById);
router.put("/update", productController.updateProductById);
router.get("/get-name/:name", productController.getProductByName);

module.exports = router;
