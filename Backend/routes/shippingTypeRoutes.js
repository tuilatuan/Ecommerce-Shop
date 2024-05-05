const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const shippingTypeController = require("../controllers/shippingTypeController");

const router = express.Router();
// router.use(authMiddleware.protect)

router.get("/", shippingTypeController.findAll)
router.get("/id",shippingTypeController.findById)
router.get("/name",shippingTypeController.findByName)
router.post("/",shippingTypeController.create)
router.put("/",shippingTypeController.updateById)
router.delete("/",shippingTypeController.deleteById)

module.exports = router;