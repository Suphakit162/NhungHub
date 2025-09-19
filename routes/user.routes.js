// routes/user.routes.js
const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");


router.get("/:id", userController.getProfile);
router.put("/:id/profile", userController.updateProfile);

module.exports = router;
