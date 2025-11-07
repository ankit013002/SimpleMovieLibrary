const { handleCommonTMDBErrors } = require("../utils/handleCommonTMDBErrors");

async function getTrendingMovies(req, res) {
  try {
    const movieAPIResponse = await fetch(
      `https://api.themoviedb.org/3/trending/movie/day?api_key=${process.env.TMDB_API}`
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
      page: movieData.page,
      movies: movieData.results,
    });
  } catch (err) {
    return handleCommonTMDBErrors(err, res);
  }
}

async function getMovieByName(req, res) {
  const { title } = req.query;
  try {
    const movieAPIResponse = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${title}&api_key=${process.env.TMDB_API}`
    );
    const movieData = await movieAPIResponse.json();

    console.log(movieData);

    if (movieData.status_code && movieData.status_code == 7) {
      const err = new Error(movieData.status_message);
      err.status = 500;
      err.code = "API_ERROR";
      throw err;
    }

    res.status(200).json({
      message: `Retrieved ${movieData.results.length} movies`,
      page: movieData.page,
      movies: movieData.results,
    });
  } catch (err) {
    return handleCommonTMDBErrors(err, res);
  }
}

module.exports = { getTrendingMovies, getMovieByName };
