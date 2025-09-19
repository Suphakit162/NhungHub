// controllers/auth.controller.js

// ดึง model User ออกมาจากไฟล์ models
const { User } = require("../models");
// ดึง jwt และ bcrypt มาใช้
const jwt = require("jsonwebtoken");
// ใช้ bcrypt ในการ hash password
const bcrypt = require("bcrypt");

// ใช้ secret key จาก environment variable หรือกำหนดค่าเริ่มต้น
const SECRET = process.env.JWT_SECRET || "supersecret";
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || "refreshsecret";

let refreshTokens = []; // สำหรับเก็บ refresh token (production แนะนำใช้ DB/Redis)

// ฟังก์ชันสำหรับลงทะเบียนผู้ใช้ใหม่
exports.register = async (req, res) => {
    try {
      // ดึงข้อมูล username, email, password จาก body ของ request
      const { username, email, password } = req.body;
      // สร้างผู้ใช้ใหม่ในฐานข้อมูล
      const user = await User.create({ username, email, password });
      // ส่งข้อความยืนยันการลงทะเบียนกลับไป
      res.status(201).json({ message: "User registered successfully", user });
    } catch (err) {
      console.error(err); // ✅ log เต็ม ๆ บน console
  
      //เช็ค error ว่าเป็น validation หรือ unique constraint error หรือไม่
      if (err.name === "SequelizeValidationError" || err.name === "SequelizeUniqueConstraintError") {
        return res.status(400).json({
          message: "Registration failed",
          errors: err.errors.map((e) => ({
            field: e.path, // ชื่อฟิลด์ที่มีปัญหา
            error: e.message, // ข้อความ error
          })),
        });
      }
  
      // ถ้ามี error อื่น ๆ -> ส่ง status 500 (internal server error)
      res.status(500).json({ message: "Something went wrong", error: err.message });
    }
  };
  
  // ฟังก์ชันสำหรับล็อกอินผู้ใช้
  exports.login = async (req, res) => {
        try {
          // ดึงข้อมูล email, password จาก body ของ request
          const { email, password } = req.body;
          // หา user จาก email ที่ส่งมา
          const user = await User.findOne({ where: { email } });
          // ถ้าไม่เจอ user -> ส่ง status 404 (ไม่พบ)
          if (!user) return res.status(404).json({ message: "User not found" });
      
          let isValid;
          // ตรวจสอบรหัสผ่าน
          if (user.password.startsWith("$2b$")) {
            // ถ้าเป็น hash ที่เข้ารหัสด้วย bcrypt -> ใช้ bcrypt.compare
            isValid = await bcrypt.compare(password, user.password);
          } else {
            // ถ้าเป็น plain text (user เก่าใน DB) เทียบตรง ๆ
            isValid = password === user.password;
          }
      
          // ถ้ารหัสผ่านไม่ถูกต้อง -> ส่ง status 401 (unauthorized)
          if (!isValid) return res.status(401).json({ message: "Invalid password" });
      
          // สร้าง JWT access token และ refresh token เมื่อเข้าสู่ระบบสำเร็จ exp 15 นาที, refresh token 7 วัน
          const accessToken = jwt.sign(
            { id: user.id, email: user.email },
            SECRET,
            { expiresIn: "5m" }
          );
          const refreshToken = jwt.sign(
            { id: user.id, email: user.email },
            REFRESH_SECRET,
            { expiresIn: "7d" }
          );
      
          // เก็บ refresh token ไว้ในตัวแปร (production แนะนำใช้ DB/Redis)
          refreshTokens.push(refreshToken);
          // ส่ง access token และ refresh token กลับไป
          res.json({ accessToken, refreshToken });
        } catch (err) {
          res.status(500).json({ message: "Login failed", error: err.message });
        }
      };
      

  // ฟังก์ชันสำหรับล็อกเอาต์ผู้ใช้
  exports.logout = (req, res) => {
    const { token } = req.body;
    // ลบ refresh token ออกจากตัวแปร
    refreshTokens = refreshTokens.filter((t) => t !== token);
    res.json({ message: "Logged out successfully" });
  };

  exports.refresh = (req, res) => {
    const { token } = req.body;
    // ตรวจสอบว่าได้รับ refresh token มาหรือไม่
    if (!token) return res.status(401).json({ message: "No refresh token" });
    // ตรวจสอบว่า refresh token นี้อยู่ในรายการที่เก็บไว้หรือไม่
    if (!refreshTokens.includes(token))
      return res.status(403).json({ message: "Invalid refresh token" });

    // ตรวจสอบความถูกต้องของ refresh token
    jwt.verify(token, REFRESH_SECRET, (err, user) => {
      if (err) return res.status(403).json({ message: "Invalid token" });

      // ถ้าผ่าน -> สร้าง access token ใหม่ (15 นาที)
      const accessToken = jwt.sign(
        { id: user.id, email: user.email },
        SECRET,
        { expiresIn: "5m" }
      );
      // ส่ง access token ใหม่กลับไป
      res.json({ accessToken });
    });
  };
