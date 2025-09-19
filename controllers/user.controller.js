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

// ใช้สำหรับอัปเดตข้อมูลโปรไฟล์ของผู้ใช้
exports.updateProfile = async (req, res) => {
  try {
    // ดึง id ของผู้ใช้จาก params และแปลงเป็นตัวเลขฐาน 10
    const id = parseInt(req.params.id, 10);

    // ดึงค่าที่ต้องการอัปเดตจาก body ของ request
    const { username, email, password } = req.body;

    // ค้นหาผู้ใช้ในฐานข้อมูลตาม primary key
    const user = await User.findByPk(id);

    // ถ้าไม่พบผู้ใช้ ส่ง status 404 (Not Found) พร้อมข้อความ
    if (!user) return res.status(404).json({ message: "User not found" });

    // สร้าง object สำหรับเก็บค่าที่จะอัปเดต
    const updateData = {};
    if (username) updateData.username = username.trim(); // trim space ก่อนเก็บ
    if (email) updateData.email = email.trim(); // trim space ก่อนเก็บ
    if (password) updateData.password = password; // password จะถูก hash ผ่าน hook ของ Sequelize

    // อัปเดตข้อมูลผู้ใช้ในฐานข้อมูล
    const updatedUser = await user.update(updateData);

    // ส่ง response กลับ พร้อมข้อความสำเร็จและข้อมูลผู้ใช้ที่อัปเดตแล้ว
    res.json({ message: "Profile updated successfully", user: updatedUser });
  } catch (err) {
    // ถ้าเกิดข้อผิดพลาดอื่น ๆ ส่ง status 500 (Internal Server Error)
    res.status(500).json({ message: "Failed to update profile", error: err.message });
  }
};


