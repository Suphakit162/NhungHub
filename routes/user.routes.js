// routes/user.routes.js
const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const { authenticateToken } = require("../middlewares/authMiddleware");
const { User } = require("../models"); 

router.get("/:id/profile", authenticateToken, userController.getProfile);
router.put("/:id/profile", authenticateToken, userController.updateProfile);

//มาร์ค 
//นำข้อมูลรูปแบบ JSON มาเพิ่มในตาราง Users
router.post('/data', async (req, res) => {
  const data = req.body;
  const users = Array.isArray(data)
            ? await User.bulkCreate(data)
            : await User.create(data);
  res.json(users);
});

module.exports = router;
