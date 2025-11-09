const express = require("express");
const {
  getTrendingMovies,
  getMovieByName,
  getMovieById,
} = require("../controllers/movie.controller");
const router = express.Router();

router.get("/trending", getTrendingMovies);

router.get("/movie-by-title", getMovieByName);

router.get("/movie-by-id", getMovieById);

module.exports = router;
