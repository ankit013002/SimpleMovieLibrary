const { handleCommonTMDBErrors } = require("../utils/handleCommonTMDBErrors");
const redisClient = require("../config/redis");
const { retrieveMovieById } = require("../services/movie.services");

const DEFAULT_EXPIRATION = 3600;

async function getTrendingMovies(req, res) {
  const { page } = req.query;

  try {
    const cached = await redisClient.get(`trending-movies-${page}`);
    let movieData = null;
    if (cached) {
      movieData = JSON.parse(cached);
    } else {
      const movieAPIResponse = await fetch(
        `https://api.themoviedb.org/3/trending/movie/day?page=${page}&api_key=${process.env.TMDB_API}`
      );
      movieData = await movieAPIResponse.json();
      redisClient.setEx(
        `trending-movies-${page}`,
        DEFAULT_EXPIRATION,
        JSON.stringify(movieData)
      );
    }

    if (movieData.status_code && movieData.status_code == 7) {
      const err = new Error(movieData.status_message);
      err.status = 500;
      err.code = "API_ERROR";
      throw err;
    }

    return res.status(200).json({
      message: `Retrieved ${movieData.results.length} movies`,
      count: movieData.results.length,
      page: movieData.page,
      movies: movieData.results,
    });
  } catch (err) {
    return handleCommonTMDBErrors(err, res);
  }
}

async function getMovieByName(req, res) {
  const { title, page } = req.query;
  try {
    const movieAPIResponse = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${title}&page=${page}&api_key=${process.env.TMDB_API}`
    );
    const movieData = await movieAPIResponse.json();

    if (movieData.status_code && movieData.status_code == 7) {
      const err = new Error(movieData.status_message);
      err.status = 500;
      err.code = "API_ERROR";
      throw err;
    }

    res.status(200).json({
      message: `Retrieved ${movieData.results.length} movies`,
      count: movieData.results.length,
      page: movieData.page,
      movies: movieData.results,
    });
  } catch (err) {
    return handleCommonTMDBErrors(err, res);
  }
}

async function getMovieById(req, res) {
  const { id } = req.query;
  try {
    const movie = await retrieveMovieById(id);

    res.status(200).json({
      message: `Retrieved ${movie.title}`,
      movie: movie,
    });
  } catch (err) {
    return handleCommonTMDBErrors(err, res);
  }
}

async function getMoviesByIds(req, res) {
  const { likedMovies } = req.body;
  const movies = [];

  try {
    await Promise.all(
      likedMovies.map(async (id) => {
        const movie = await retrieveMovieById(id);

        movies.push(movie);
      })
    );

    res.status(200).json({
      message: `Retrieved ${movies.length} movies`,
      movies: movies,
    });
  } catch (err) {
    return handleCommonTMDBErrors(err, res);
  }
}

module.exports = {
  getTrendingMovies,
  getMovieByName,
  getMovieById,
  getMoviesByIds,
};
