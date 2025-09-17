// routes/user.routes.js
const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const { authenticateToken } = require("../middlewares/authMiddleware");

router.get("/:id/profile", authenticateToken, userController.getProfile);
router.put("/:id/profile", authenticateToken, userController.updateProfile);

module.exports = router;
