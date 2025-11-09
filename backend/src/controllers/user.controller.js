const {
  createUser,
  logUserIn,
  getUserFromToken,
  toggleLikedMovieForUser,
} = require("../services/user.services");
const {
  handleCommonMongooseErrors,
} = require("../utils/handleCommonMongooseErrors");
const jwt = require("jsonwebtoken");

async function createNewUser(req, res) {
  const { name, email, password } = req.body;

  try {
    const user = await createUser(name, email, password);

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res.status(201).json({
      message: `User successfully created`,
      user: {
        name: user.name,
        email: user.email,
      },
      token,
    });
  } catch (err) {
    if (err.code === "INVALID_PASSWORD") {
      return res.status(400).json({
        message: `Invalid passowrd: ${err.message}`,
        error: err,
      });
    }

    return handleCommonMongooseErrors(err, res);
  }
}

async function loginUsesr(req, res) {
  const { email, password } = req.body;
  try {
    const user = await logUserIn(email, password);

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res.status(200).json({
      message: "User logged in successfully",
      user: {
        name: user.name,
        email: user.email,
      },
      token,
    });
  } catch (err) {
    if (err.code === "USER_DOES_NOT_EXIST") {
      return res.status(err.status).json({
        message: "User does not exist",
        error: err,
      });
    }

    if (err.code === "INVALID_PASSWORD") {
      return res.status(400).json({
        message: `Invalid password: ${err.message}`,
        error: err,
      });
    }
    return handleCommonMongooseErrors(err, res);
  }
}

async function getUser(req, res) {
  const authHeader = req.headers.authorization;
  try {
    const decodedToken = jwt.decode(authHeader);
    if (!decodedToken) {
      const err = new Error("No token provided");
      err.status = 400;
      err.code = "TOKEN_DOES_NOT_EXIST";
      throw err;
    }
    const user = await getUserFromToken(decodedToken);
    return res.status(200).json({
      message: "Successfully retrieved user",
      user: {
        name: user.name,
        email: user.email,
        likedMovies: user.likedMovies,
      },
    });
  } catch (err) {
    if (err.code === "TOKEN_DOES_NOT_EXIST") {
      return res.status(err.status).json({
        message: "Token not provided",
        error: err,
      });
    }

    return handleCommonMongooseErrors(err, res);
  }
}

async function toggleLikedMovie(req, res) {
  const { id, email } = req.query;

  try {
    await toggleLikedMovieForUser(id, email);

    return res.status(200).json({
      message: "Successfully modified user's liked movies list",
    });
  } catch (err) {
    if (err.code === "USER_DOES_NOT_EXIST") {
      return res.status(err.status).json({
        message: "User does not exist",
        error: err,
      });
    }
    return handleCommonMongooseErrors(err, res);
  }
}

module.exports = {
  createNewUser,
  loginUsesr,
  getUser,
  toggleLikedMovie,
};
