const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const cartController = require("../controllers/cartController");

const router = express.Router();
// router.use(authMiddleware.protect);

router.get("/me", cartController.findByUserId);
router.get("/", cartController.findAll);
router.get("/id", cartController.findById);
router.post("/", cartController.create);
router.put("/", cartController.updateById);
router.delete("/:itemId", cartController.deleteById);
router.delete("/me", cartController.deleteAllByUserID);

module.exports = router;
