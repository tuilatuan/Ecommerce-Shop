const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const authController = require("../controllers/authController");

const router = express.Router();
// router.use(authMiddleware.protect);

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/loginadmin", authController.loginadmin);
router.post("/check-is-login", authController.checkIsLogin);
router.post("/refesh", authController.refreshToken);
module.exports = router;
