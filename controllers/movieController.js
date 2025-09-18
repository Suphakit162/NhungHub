//แตม
const movieService = require('../services/movieService');

exports.getAllMovies = async (req, res, next) => {
  try {
    const movies = await movieService.getAllMovies(req.query);
    res.json(movies);
  } catch (err) {
    next(err);
  }
};

exports.getMovieById = async (req, res, next) => {
  try {
    const movie = await movieService.getMovieById(req.params.id);
    res.json(movie);
  } catch (err) {
    next(err);
  }
};

exports.searchMovies = async (req, res, next) => {
  try {
    const results = await movieService.searchMovies(req.query.keyword);
    res.json(results);
  } catch (err) {
    next(err);
  }
};

exports.getGenres = async (req, res, next) => {
  try {
    const genres = await movieService.getGenres();
    res.json(genres);
  } catch (err) {
    next(err);
  }
};//แตม


