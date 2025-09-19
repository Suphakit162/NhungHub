// routes/auth.routes.js
const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");

// สมัครสมาชิก
router.post("/register", authController.register);

// ล็อกอิน
router.post("/login", authController.login);

// ออกจากระบบ
router.post("/logout", authController.logout);

module.exports = router;
