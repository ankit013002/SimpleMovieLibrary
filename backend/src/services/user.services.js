const User = require("../models/user.model");
const { hashPassword } = require("../utils/hashPassword");

async function createUser(name, email, password) {
  const hashed = await hashPassword(password);
  const newUser = await User.create({ name, email, password: hashed });
  return newUser;
}

module.exports = { createUser };
