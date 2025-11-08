const { createUser, logUserIn } = require("../services/user.services");
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

    console.log(user);

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

module.exports = { createNewUser, loginUsesr };
