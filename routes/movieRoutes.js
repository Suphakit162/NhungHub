const express = require('express');

//มาร์ค 
//นำ 
const Movie = require('../models/movie');

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
  const data = req.body;
  const Movies = Array.isArray(data)
        ? await Movie.bulkCreate(data)
        : await Movie.create(data);
  res.json(Movies);
});

module.exports = router;