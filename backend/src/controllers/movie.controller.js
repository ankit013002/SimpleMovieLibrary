const { handleCommonTMDBErrors } = require("../utils/handleCommonTMDBErrors");

async function getTrendingMovies(req, res) {
  const { page } = req.query;

  try {
    const movieAPIResponse = await fetch(
      `https://api.themoviedb.org/3/trending/movie/day?page=${page}&api_key=${process.env.TMDB_API}`
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

module.exports = { getTrendingMovies, getMovieByName };
