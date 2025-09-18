const express = require('express');

//มาร์ค 
//นำ 
const { Movies } = require('../models');
const router = express.Router();

//แตม
//ดึง controller มาใช้
const movieController = require('../controllers/movieController');

//ดึงข้อมูลหนังจาก controller มาใช้
router.get('/', movieController.getAllMovies);
router.get('/search', movieController.searchMovies);
router.get('/genres', movieController.getGenres);
router.get('/:id', movieController.getMovieById);//แตม

//มาร์ค 
//นำข้อมูลรูปแบบ JSON มาเพิ่มในตาราง Movies
router.post('/data', async (req, res) => {
  try {
    if (!Movies) {
      throw new Error('Movies model not found');
    }
    const data = req.body;
    const movies = Array.isArray(data)
      ? await Movies.bulkCreate(data)   // ✅ ใช้ Movies.bulkCreate
      : await Movies.create(data);
    res.json(movies);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;