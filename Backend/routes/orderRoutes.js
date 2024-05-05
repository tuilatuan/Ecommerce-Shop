const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const orderController = require("../controllers/orderController");

const router = express.Router();
// router.use(authMiddleware.protect)

router.get("/", orderController.findAll);
router.get("/id", orderController.findById);
router.get("/userID", orderController.findByUserID);
router.post("/", orderController.create);
router.post("/checkOut", orderController.checkOut);
router.put("/update", orderController.updateById);
router.delete("/", orderController.deleteById);

module.exports = router;
