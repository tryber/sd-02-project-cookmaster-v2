const jwt = require('jsonwebtoken');
const { getUser } = require('../services/usersService');

const { JWT_SECRET } = process.env;

const jwtConfig = {
  expiresIn: '30m',
  algorithm: 'HS256',
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return next({ code: 'invalid_data', message: 'Missing fields' });

    const user = await getUser(email);

    if (!user[0] || user[0].password !== password) {
      return next({ code: 'unauthorized', message: 'User not found or wrong password' });
    }

    const { password: _, name: __, ...payload } = user[0];

    const token = jwt.sign(payload, JWT_SECRET, jwtConfig);

    res.status(200).json({
      login: 'success',
      token,
    });
  } catch (error) {
    next({ code: 'something_wrong', message: 'Something went wrong' });
  }
};

const authUser = async (req, res, next) => {
  const token = req.headers.authorization;
  try {
    if (!token) return next({ code: 'unauthorized', message: 'Missing JWT' });
    const payload = jwt.verify(token, JWT_SECRET);

    const user = await getUser(payload.email);

    if (!user[0]) return next({ code: 'not_found', message: 'User not found' });

    const [userObj] = user;
    req.user = userObj;

    next();
  } catch (err) {
    next({ code: 'something_wrong', message: 'Something went wrong' });
  }
};

module.exports = {
  login,
  authUser,
};
