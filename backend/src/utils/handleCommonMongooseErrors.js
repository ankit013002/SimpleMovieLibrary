function handleCommonMongooseErrors(err, res) {
  if (err.code === 11000) {
    const key = Object.keys(err.keyValue || {})[0];
    const value = Object.values(err.keyValue || {})[0];
    return res.status(400).json({
      message: `Duplicate value for field '${key}': '${value}'`,
      error: err,
    });
  }

  if (err.name === "ValidationError") {
    return res.status(400).json({
      message: `Validation Error: ${err.message}`,
      error: err,
    });
  }

  if (err.name === "CastError") {
    return res.status(400).json({
      message: `Cast Error: ${err.type}: ${err.value}`,
      error: err,
    });
  }

  return res.status(500).json({
    message: `Internal Server Error: ${err.message}`,
    error: err,
  });
}

module.exports = { handleCommonMongooseErrors };
