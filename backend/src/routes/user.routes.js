const express = require("express");
const { createNewUser, loginUsesr, getUser } = require("../controllers/user.controller");
const router = express.Router();

router.get("/health", (req, res) => {
  res.status(200).json("User Router is healthy");
});

router.post("/signup", createNewUser);

router.post("/login", loginUsesr);

router.get("/retrieve-user", getUser);

module.exports = router;
