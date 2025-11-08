const { createUser } = require("../services/user.services");
const {
  handleCommonMongooseErrors,
} = require("../utils/handleCommonMongooseErrors");

async function createNewUser(req, res) {
  const { name, email, password } = req.body;

  try {
    const user = await createUser(name, email, password);

    return res.status(201).json({
      message: `User successfully created, ${user.email}`,
      email,
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

  return res.status(200).end();
}

module.exports = { createNewUser };
