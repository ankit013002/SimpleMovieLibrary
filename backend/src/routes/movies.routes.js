const express = require("express");
const {
  getTrendingMovies,
  getMovieByName,
} = require("../controllers/movie.controller");
const router = express.Router();

router.get("/trending", getTrendingMovies);

router.get("/movie-by-title", getMovieByName);

module.exports = router;
