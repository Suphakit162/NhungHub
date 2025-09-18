// middlewares/authMiddleware.js

// ใช้สำหรับตรวจสอบ JWT token
const jwt = require("jsonwebtoken");
// secret key ที่ใช้ตรวจสอบ token
const SECRET = process.env.JWT_SECRET || "supersecret";

// ใช้เป็น middleware สำหรับป้องกัน route ที่ต้อง login ก่อน
function authenticateToken(req, res, next) {
  // ดึง token จาก header รูปแบบ Bearer TOKEN
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Bearer TOKEN

  // ถ้าไม่มี token -> ส่ง status 401 (unauthorized)
  if (!token) return res.status(401).json({ message: "No token provided" });

  // ตรวจสอบ token
  jwt.verify(token, SECRET, (err, user) => {
    // ถ้า token ไม่ถูกต้อง -> ส่ง status 403 (forbidden)
    if (err) return res.status(403).json({ message: "Invalid token" });
    // ถ้า token ถูกต้อง -> เก็บข้อมูล user ไว้ใน req.user แล้วไปต่อ
    req.user = user;
    next();
  });
}

// ส่งออก middleware นี้เพื่อใช้ใน route อื่น ๆ
module.exports = { authenticateToken };
