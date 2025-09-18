const { DataTypes } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  // มาร์ค
  // สร้างโมเดล table admin
  const Admins = sequelize.define('Admins', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  return Admins;
};