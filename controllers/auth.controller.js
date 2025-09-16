// controllers/auth.controller.js
const { User } = require("../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");


const SECRET = process.env.JWT_SECRET || "supersecret";
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || "refreshsecret";

let refreshTokens = []; // สำหรับเก็บ refresh token (production แนะนำใช้ DB/Redis)

exports.register = async (req, res) => {
    try {
      const { username, email, password } = req.body;
      const user = await User.create({ username, email, password });
      res.status(201).json({ message: "User registered successfully", user });
    } catch (err) {
      console.error(err); // ✅ log เต็ม ๆ บน console
  
      if (err.name === "SequelizeValidationError" || err.name === "SequelizeUniqueConstraintError") {
        return res.status(400).json({
          message: "Registration failed",
          errors: err.errors.map((e) => ({
            field: e.path,
            error: e.message,
          })),
        });
      }
  
      res.status(500).json({ message: "Something went wrong", error: err.message });
    }
  };
  
exports.login = async (req, res) => {
        try {
          const { email, password } = req.body;
          const user = await User.findOne({ where: { email } });
          if (!user) return res.status(404).json({ message: "User not found" });
      
          let isValid;
          if (user.password.startsWith("$2b$")) {
            // ถ้าเป็น bcrypt hash
            isValid = await bcrypt.compare(password, user.password);
          } else {
            // ถ้าเป็น plain text (user เก่าใน DB)
            isValid = password === user.password;
          }
      
          if (!isValid) return res.status(401).json({ message: "Invalid password" });
      
          const accessToken = jwt.sign(
            { id: user.id, email: user.email },
            SECRET,
            { expiresIn: "15m" }
          );
          const refreshToken = jwt.sign(
            { id: user.id, email: user.email },
            REFRESH_SECRET,
            { expiresIn: "7d" }
          );
      
          refreshTokens.push(refreshToken);
      
          res.json({ accessToken, refreshToken });
        } catch (err) {
          res.status(500).json({ message: "Login failed", error: err.message });
        }
      };
      

exports.logout = (req, res) => {
  const { token } = req.body;
  refreshTokens = refreshTokens.filter((t) => t !== token);
  res.json({ message: "Logged out successfully" });
};

exports.refresh = (req, res) => {
  const { token } = req.body;
  if (!token) return res.status(401).json({ message: "No refresh token" });
  if (!refreshTokens.includes(token))
    return res.status(403).json({ message: "Invalid refresh token" });

  jwt.verify(token, REFRESH_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid token" });

    const accessToken = jwt.sign(
      { id: user.id, email: user.email },
      SECRET,
      { expiresIn: "15m" }
    );
    res.json({ accessToken });
  });
};
