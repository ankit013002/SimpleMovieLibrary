const express = require("express");
const moviesRouter = require("./routes/movies.routes");
const cors = require("cors");
const app = express();

require("dotenv").config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/health", (req, res) => {
  return res.status(200).json("Server is healthy");
});

app.use("/movies", moviesRouter);

module.exports = app;
