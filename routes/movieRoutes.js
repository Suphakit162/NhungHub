const express = require('express');

const Movie = require('../models/movie');

const router = express.Router();

//ดึง controller มาใช้
const movieController = require('../controllers/movieController');

//ดดึงข้อมูลหนังจาก controller มาใช้
router.get('/', movieController.getAllMovies);
router.get('/search', movieController.searchMovies);
router.get('/genres', movieController.getGenres);
router.get('/:id', movieController.getMovieById);

router.post('/data', async (req, res) => {
  const data = req.body;
  const Movies = Array.isArray(data)
        ? await Movie.bulkCreate(data)
        : await Movie.create(data);
  res.json(Movies);
});

module.exports = router;