// controllers/auth.controller.js

const { User } = require("../models");
const bcrypt = require("bcrypt");

// ฟังก์ชันสำหรับลงทะเบียนผู้ใช้ใหม่
exports.register = async (req, res) => {
  try {
    // ดึงค่าจาก body ของ request: username, email และ password
    const { username, email, password } = req.body;

    // สร้างผู้ใช้ใหม่ในฐานข้อมูลโดยใช้โมเดล User
    // await รอจนกว่าการสร้างผู้ใช้เสร็จสิ้น
    const user = await User.create({ username, email, password });

    // ส่ง response กลับไปพร้อม status 201 (Created) และข้อมูลผู้ใช้
    res.status(201).json({ message: "User registered successfully", user });
  } catch (err) {
    // ถ้าเกิดข้อผิดพลาดที่เกี่ยวกับการ validate ของ Sequelize หรือค่า unique constraint
    if (err.name === "SequelizeValidationError" || err.name === "SequelizeUniqueConstraintError") {
      // ส่ง response status 400 (Bad Request) พร้อมรายละเอียด error ของแต่ละ field
      return res.status(400).json({
        message: "Registration failed",
        errors: err.errors.map(e => ({ field: e.path, error: e.message })) // map เพื่อดึง field และข้อความ error
      });
    }
    // ถ้าเป็นข้อผิดพลาดอื่น ๆ ส่ง response status 500 (Internal Server Error)
    res.status(500).json({ message: "Something went wrong", error: err.message });
  }
};


// ฟังก์ชันสำหรับล็อกอินผู้ใช้
exports.login = async (req, res) => {
  try {
    // ดึง email จาก body ของ request และ trim space + แปลงเป็น lowercase
    const email = req.body.email.trim().toLowerCase();

    // ดึง password จาก body ของ request
    const password = req.body.password;

    // ค้นหาผู้ใช้ในฐานข้อมูลที่มี email ตรงกับที่ส่งมา
    const user = await User.findOne({ where: { email } });

    // ถ้าไม่พบผู้ใช้ ส่ง status 404 (Not Found) พร้อมข้อความ
    if (!user) return res.status(404).json({ message: "User not found" });

    // ตรวจสอบรหัสผ่าน
    // ถ้า password ในฐานข้อมูลเป็น bcrypt hash (ขึ้นต้นด้วย "$2b$")
    // ใช้ bcrypt.compare เพื่อเทียบ password
    // ถ้าไม่ใช่ hash เปรียบเทียบแบบ plain text
    const isValid = user.password.startsWith("$2b$")
      ? await bcrypt.compare(password, user.password)
      : password === user.password;

    // ถ้ารหัสผ่านไม่ถูกต้อง ส่ง status 401 (Unauthorized) พร้อมข้อความ
    if (!isValid) return res.status(401).json({ message: "Invalid password" });

    // เก็บ user id ลง session แทนการใช้ token
    req.session.userId = user.id;

    // ส่ง response กลับ พร้อมข้อความ login สำเร็จ และข้อมูลผู้ใช้
    res.json({ message: "Login successful", user });
  } catch (err) {
    // ถ้าเกิดข้อผิดพลาดอื่น ๆ ส่ง status 500 (Internal Server Error)
    res.status(500).json({ message: "Login failed", error: err.message });
  }
};


// ฟังก์ชันสำหรับ logout
exports.logout = (req, res) => {
  req.session.destroy(err => {
    if (err) return res.status(500).json({ message: "Logout failed" });
    res.json({ message: "Logged out successfully" });
  });
};
