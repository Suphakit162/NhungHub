//แตม
const { DataTypes } = require('sequelize');
// เปลี่ยนจาก module.exports = Movies;
// เป็นการส่งออกฟังก์ชันที่รับ sequelize และ DataTypes เข้ามา
// แก้ไข: รับ argument ที่ส่งมาจาก index.js
module.exports = (sequelize, DataTypes) => {
  // มาร์ค
  // สร้างโมเดล table Movies
  const Movies = sequelize.define('Movies', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0,
        max: 5
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    genre: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true
    },
    review: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
      allowNull: true
    }
  });
  return Movies;
};//แตม