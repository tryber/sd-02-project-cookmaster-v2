const jwt = require('jsonwebtoken');
const boom = require('boom');

const { JWT_SECRET } = process.env;

const auth = async (req, _res, next) => {
  const token = req.headers.authorization;

  if (!token) return next(boom.unauthorized('Um token é necessário'));

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    const { sub, name, email, role } = payload;

    const user = {
      id: Number(sub),
      name,
      email,
      role,
    };

    req.user = user;
    return next();
  } catch (err) {
    next(boom.unauthorized(err.message));
  }
}

// const SESSIONS = {};

// const getUser = async (req) => {
//   const { token = '' } = req.cookies || {};
//   if (!token) return null;

//   const userId = SESSIONS[token];
//   if (!userId) return null;

//   const user = await userModel.findById(userId);
//   if (!user) return null;

//   return user;
// };

// const authMiddleware = (required = true) => async (req, res, next) => {
//   const user = await getUser(req);

//   if (!user && required)
//     return res.redirect(`/login?redirect=${encodeURIComponent(req.url)}`);

//   if (!user && !required) return next();

//   const { password, ...userData } = user;

//   req.user = userData;

//   req.userPassword = password;

//   return next();
// };

// module.exports = {
//   SESSIONS,
//   getUser,
//   authMiddleware,
// };

module.exports = auth;
