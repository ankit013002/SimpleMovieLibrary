const User = require("../models/user.model");
const { hashPassword, verifyPassword } = require("../utils/hashPassword");

async function createUser(name, email, password) {
  const hashed = await hashPassword(password);
  const newUser = await User.create({ name, email, password: hashed });
  return newUser;
}

async function logUserIn(email, password) {
  const user = await User.findOne({ email: email });

  if (!user) {
    const err = new Error("User does not exist");
    err.status = 404;
    err.code = "USER_DOES_NOT_EXIST";
    throw err;
  }

  const passwordVerification = await verifyPassword(password, user.password);
  if (!passwordVerification) {
    const err = new Error("Invalid Password");
    err.status = 400;
    err.code = "INVALID_PASSWORD";
    throw err;
  }

  return user;
}

async function getUserFromToken(token) {
  const user = await User.findById(token.userId);
  return user;
}

async function toggleLikedMovieForUser(movieId, email) {
  const user = await User.findOne({ email });

  if (!user) {
    const err = new Error("User does not exist");
    err.status = 404;
    err.code = "USER_DOES_NOT_EXIST";
    throw err;
  }

  if (user.likedMovies.includes(movieId)) {
    const newLikedMovies = user.likedMovies.filter((movie) => movie != movieId);
    user.likedMovies = newLikedMovies;
  } else {
    user.likedMovies.push(movieId);
  }

  user.save();

  return user;
}

module.exports = {
  createUser,
  logUserIn,
  getUserFromToken,
  toggleLikedMovieForUser,
};
