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

module.exports = router;