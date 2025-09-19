// controllers/user.controller.js

// ดึง model User ออกมาจากไฟล์ models
const { User } = require("../models");

//ใช้ดึงข้อมูลโปรไฟล์ของ user ตาม id
exports.getProfile = async (req, res) => {
  try {
    // หา user จาก id ที่ส่งมาใน URL (req.params.id)
    const user = await User.findByPk(req.params.id, {
      attributes: { exclude: ["password"] },
    });
    // ถ้าไม่เจอ user -> ส่ง status 404 (ไม่พบ)
    if (!user) return res.status(404).json({ message: "User not found" });
    // ถ้าเจอ -> ส่งข้อมูล user กลับไปเป็น JSON
    res.json(user);
  } catch (err) {
    // ถ้ามี error อื่น ๆ -> ส่ง status 500 (internal server error)
    res.status(500).json({ message: "Failed to get profile", error: err.message });
  }
};

//ใช้อัปเดตข้อมูลโปรไฟล์ของ user
exports.updateProfile = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const updateData = {};
    if (username) updateData.username = username;
    if (email) updateData.email = email.trim(); // ตัด space กัน validation error
    if (password) updateData.password = password; // bcrypt จะ hash ผ่าน hook

    await user.update(updateData);

    res.json({ message: "Profile updated successfully", user });
  } catch (err) {
    res.status(500).json({
      message: "Failed to update profile",
      error: err.message,
    });
  }
};

