//แตม
const db = require('../models');
const Movie = db.Movies;
const { Op } = db.Sequelize;

exports.getAllMovies = async (query) => {
  let where = {};
  if (query.genre) where.genre = query.genre;
  if (query.year) where.year = query.year;
  if (query.rating) where.rating = query.rating;

  return await Movie.findAll({ where });
};

exports.getMovieById = async (id) => {
  return await Movie.findByPk(id);
};

exports.searchMovies = async (keyword) => {
  return await Movie.findAll({
    where: {
      name: { [Op.like]: `%${keyword}%` }
    }
  });
};

exports.getGenres = async () => {
  const genres = await Movie.findAll({
    attributes: [
      [db.Sequelize.fn('DISTINCT', db.Sequelize.col('genre')), 'genre']
    ]
  });
  return genres.map(g => g.genre);
};//แตม
