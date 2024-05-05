const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const statusOrderController = require("../controllers/statusOrderController");

const router = express.Router();
// router.use(authMiddleware.protect)

router.get("/", statusOrderController.findAll);
router.get("/id", statusOrderController.findById);
router.post("/", statusOrderController.create);
router.put("/", statusOrderController.updateById);
router.delete("/", statusOrderController.deleteById);

module.exports = router;
