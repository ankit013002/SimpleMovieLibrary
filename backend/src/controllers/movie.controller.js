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
    if (err.code === "API_ERROR") {
      return res.status(err.status).json({
        message: err.message,
        error: err,
      });
    }

    return res.status(500).json({
      message: `Internal Server Error, ${err.message}`,
      error: err,
    });
  }
}

module.exports = { getTrendingMovies };
