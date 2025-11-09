async function retrieveMovieById(movieId) {
  const movieAPIResponse = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.TMDB_API}`
  );
  const movieData = await movieAPIResponse.json();

  if (movieData.status_code && movieData.status_code == 7) {
    const err = new Error(movieData.status_message);
    err.status = 500;
    err.code = "API_ERROR";
    throw err;
  }

  return movieData;
}

module.exports = { retrieveMovieById };
