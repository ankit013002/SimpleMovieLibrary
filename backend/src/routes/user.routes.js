const express = require("express");
const { createNewUser } = require("../controllers/user.controller");
const router = express.Router();

router.get("/health", (req, res) => {
  res.status(200).json("User Router is healthy");
});

router.post("/", createNewUser);

module.exports = router;
