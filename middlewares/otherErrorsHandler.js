const otherErrorsHandler = (err, _req, res, _next) => (
  res.status(500).json({
    error: {
      message: err.message,
    },
  })
);

module.exports = otherErrorsHandler;
