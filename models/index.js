//แตม
//ช่วยให้โค้ดปลอดภัยขึ้น
//ป้องกันข้อผิดพลาดบางอย่าง เช่น การประกาศตัวแปรโดยไม่ได้ใช้ var, let, หรือ const
//ไม่อนุญาตให้ใช้ตัวแปรที่ไม่ได้ประกาศ
//ทำให้ JavaScript ตรวจสอบ syntax เข้มงวดขึ้น
'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize'); 
const basename = path.basename(__filename);
const db = {};

// ดึง instance sequelize จาก config/db.js
const sequelize = require('../config/db');

// อ่านไฟล์ในโฟลเดอร์ models และนำเข้าโมเดลทั้งหมด
fs
  .readdirSync(__dirname)//อ่านไฟล์ทั้งหมดในโฟลเดอร์นี้
  .filter(file => {//กรองไฟล์ที่ต้องการนำเข้า
    return (
      file.indexOf('.') !== 0 &&//ไม่ใช่ไฟล์ที่ขึ้นต้นด้วยจุด (เช่น .gitignore)
      file !== basename &&//ไม่ใช่ไฟล์ปัจจุบัน (index.js)
      file.slice(-3) === '.js' &&//เป็นไฟล์ .js
      file.indexOf('.test.js') === -1//ไม่ใช่ไฟล์ทดสอบ (เช่น *.test.js)
    );
  })
  .forEach(file => {
    //นำเข้าโมเดลและเพิ่มลงใน object db
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    //เพิ่มโมเดลลงใน object db โดยใช้ชื่อโมเดลเป็น key
    db[model.name] = model;
  });

// ถ้าโมเดลมีการเชื่อมโยง (associations) กับโมเดลอื่น ๆ ให้เรียกใช้ฟังก์ชัน associate
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// เพิ่ม instance ของ Sequelize และ Sequelize class ลงใน object db
db.sequelize = sequelize;
// เพิ่ม Sequelize class ลงใน object db เพื่อให้สามารถเข้าถึงฟีเจอร์ต่าง ๆ ของ Sequelize ได้
db.Sequelize = Sequelize;

module.exports = db;//แตม