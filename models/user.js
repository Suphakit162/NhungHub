// models/user.js
"use strict";

// นำเข้า Model จาก Sequelize 
const { Model } = require("sequelize");
//และ bcrypt สำหรับการแฮชรหัสผ่าน
const bcrypt = require("bcrypt");

module.exports = (sequelize, DataTypes) => {
  // สร้างคลาส User ที่สืบทอดจาก Model ของ Sequelize
  class User extends Model {
    // กำหนดความสัมพันธ์ระหว่างโมเดล
    static associate(models) {
      // ความสัมพันธ์อื่นๆ เช่น User.hasMany(models.Post)
    }

    // ฟังก์ชันตรวจสอบรหัสผ่านที่เข้ารหัส
    async validPassword(password) {
      // เปรียบเทียบรหัสผ่านที่ป้อนกับรหัสผ่านที่เข้ารหัสในฐานข้อมูล
      return await bcrypt.compare(password, this.password);
    }
  }

  // กำหนดฟิลด์และการตั้งค่าของโมเดล User
  User.init(
    {
      id: {
        type: DataTypes.INTEGER,  // กำหนดชนิดข้อมูลเป็น INTEGER
        primaryKey: true,         // กำหนดให้เป็น primary key
        autoIncrement: true,      // กำหนด id ให้เพิ่มค่าอัตโนมัติ
      },
      username: {
        type: DataTypes.STRING,
        unique: true,            // กำหนดให้ username ต้องไม่ซ้ำกัน
        allowNull: false,        // กำหนดให้ username ต้องไม่เป็นค่าว่าง
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: { isEmail: true },  // ตรวจสอบรูปแบบ email
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,            // เชื่อมต่อกับ instance ของ Sequelize
      modelName: "User",    // ชื่อโมเดล
      // ตั้งค่าการแฮชรหัสผ่านก่อนบันทึกลงฐานข้อมูล
      hooks: {
        // ก่อนสร้างผู้ใช้ใหม่
        async beforeCreate(user) {
          // สร้าง salt สำหรับการแฮช
          const salt = await bcrypt.genSalt(10);
          // แฮชรหัสผ่านด้วย bcrypt
          user.password = await bcrypt.hash(user.password, salt);
        },
        // ก่อนอัปเดตผู้ใช้
        async beforeUpdate(user) {
          // ถ้ารหัสผ่านมีการเปลี่ยนแปลง ให้แฮชรหัสผ่านใหม่
          if (user.changed("password")) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(user.password, salt);
          }
        },
      },
    }
  );
  return User;
};
