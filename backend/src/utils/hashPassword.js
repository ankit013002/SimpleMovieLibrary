const bcrypt = require("bcrypt");

const SALT_ROUNDS = 12;

async function hashPassword(password) {
  if (!password || typeof password !== "string") {
    const err = new Error("Password must be a non-empty string");
    err.status = 400;
    err.code = "INVALID_PASSWORD";
    throw err;
  }

  try {
    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    const hashed = await bcrypt.hash(password, salt);
    return hashed;
  } catch (err) {
    console.error("Error hashing password:", err);
    throw new Error("Failed to hash password");
  }
}

async function verifyPassword(password, hash) {
  if (!password || !hash) return false;
  return bcrypt.compare(password, hash);
}

module.exports = { hashPassword, verifyPassword };
