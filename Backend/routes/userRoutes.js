const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const userController = require("../controllers/userController");

const router = express.Router();
// router.use(authMiddleware.protect);

router.get("/profile", userController.getUserById);
router.get("/", userController.getAllUsers);
router.post("/delete", userController.deleteUserById);
router.put("/update", userController.updateUserById);
router.get("/get-name/:name", userController.findUserByName);

module.exports = router;
