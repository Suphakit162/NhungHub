//แตม
const db = require('../models');
const Movie = db.Movies;
//นำ Op มาใช้สำหรับการค้นหาขั้นสูง
const { Op } = db.Sequelize;

//ฟังก์ชันสำหรับดึงข้อมูลหนังทั้งหมด พร้อมตัวกรอง
exports.getAllMovies = async (query) => {
  let where = {};
  if (query.genre) where.genre = query.genre;//กรองตามประเภทหนัง
  if (query.year) where.year = query.year;//กรองตามปีที่ออกฉาย
  if (query.rating) where.rating = query.rating;//กรองตามคะแนน

  return await Movie.findAll({ where });
};

//ฟังก์ชันสำหรับดึงข้อมูลหนังตาม ID
exports.getMovieById = async (id) => {
  return await Movie.findByPk(id);//ค้นหาจาก primary key
};

//ฟังก์ชันสำหรับค้นหาหนังตามคำสำคัญ (keyword)
exports.searchMovies = async (keyword) => {
  return await Movie.findAll({//ใช้ Op.like เพื่อค้นหาชื่อที่มีคำว่า keyword
    where: {
      name: { [Op.like]: `%${keyword}%` }
    }
  });
};

//ฟังก์ชันสำหรับดึงรายชื่อประเภทหนังที่ไม่ซ้ำกัน
exports.getGenres = async () => {
  const genres = await Movie.findAll({//ใช้ fn และ col เพื่อดึงค่า genre ที่ไม่ซ้ำกัน
    attributes: [
      [db.Sequelize.fn('DISTINCT', db.Sequelize.col('genre')), 'genre']
    ]
  });
  return genres.map(g => g.genre);
};//แตม

