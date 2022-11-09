const jwt = require('jsonwebtoken');
const UnauthorizedError = require('./errors/unauthorized-err');
const SECRET_JWT = require('../utils/constants');

const { NODE_ENV, JWT } = process.env;

const auth = (req, res, next) => {
  const token = req.cookies.jwt;
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT : SECRET_JWT);
  } catch (err) {
    next(new UnauthorizedError('Необходима авторизация'));
  }

  req.user = payload;

  next();
};

module.exports = { auth };
