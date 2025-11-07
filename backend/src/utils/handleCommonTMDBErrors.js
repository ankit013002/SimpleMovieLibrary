function handleCommonTMDBErrors(err, res) {
  if (err.code === "API_ERROR") {
    return res.status(err.status).json({
      message: err.message,
      error: err,
    });
  }
  return res.status(500).json({
    message: `Internal Server Error, ${err.message}`,
    error: err,
  });
}

module.exports = { handleCommonTMDBErrors };
