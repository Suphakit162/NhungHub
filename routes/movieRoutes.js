const express = require('express');

const Movie = require('../models/movie');

const router = express.Router();

router.post('/data', async (req, res) => {
  const data = req.body;
  const Movies = Array.isArray(data)
        ? await Movie.bulkCreate(data)
        : await Movie.create(data);
  res.json(Movies);
});

module.exports = router;