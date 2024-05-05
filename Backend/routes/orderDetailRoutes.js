const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const orderDetailController = require("../controllers/orderDetailController");

const router = express.Router();
// router.use(authMiddleware.protect)

router.get("/:orderID", orderDetailController.findByOrderID);
router.get("/id", orderDetailController.findById);
router.get("/", orderDetailController.findAll);
router.post("/", orderDetailController.create);
router.put("/", orderDetailController.updateById);
router.delete("/", orderDetailController.deleteById);

module.exports = router;
