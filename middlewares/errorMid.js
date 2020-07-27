const errorReceive = {
  internal_error: 400,
  unauthorized: 401,
  not_found: 404,
  invalid_data: 422,
  unknown: 500,
};

const errorMid = (err, _req, res, _next) => 
  res.status(errorReceive[err.code])
    .json({
      err,
    });

module.exports = errorMid;
