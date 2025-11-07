const express = require("express");
const { getTrendingMovies } = require("../controllers/movie.controller");
const router = express.Router();

router.get("/trending", getTrendingMovies);

module.exports = router;
