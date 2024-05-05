const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const categoryController = require("../controllers/categoryController");

const router = express.Router();
// router.use(authMiddleware.protect);

router.get("/", categoryController.getAllCategories);
router.post("/create", categoryController.createCategory);
router.get("/:id", categoryController.getCategoryById);
router.post("/delete", categoryController.deleteCategoryById);
router.put("/update", categoryController.updateCategoryById);
router.get("/get-name/:name", categoryController.getCategoryByName);
router.get("/get-slug/:slug", categoryController.getCategoryBySlug);

module.exports = router;
