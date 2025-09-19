const { Sequelize } = require('sequelize');

//มาร์ค
//เชื่อมต่อฐานข้อมูล PostgreSQL
const sequelize = new Sequelize(
     'nhunghub', // อันนี้อย่าลืมลง sql ชื่อเดียวกันก่อนรัน
     'postgres', // Username เปลี่ยนตามของตัวเอง อย่าลืม
     'GGwdst76', // Password เปลี่ยนตามของตัวเอง อย่าลืม
     {
       host: 'localhost',
       dialect: 'postgres' 
     }
   );

module.exports = sequelize;