const jwt = require('jsonwebtoken');
const { compose } = require('compose-middleware');

const { JWT_SECRET } = require('../constants');

function userParser(req, res, next) {
  try {
    const { user } = jwt.verify(req.cookies.token, JWT_SECRET);
    req.user = user;
  } catch (err) {
    console.error(err.message);
  } finally {
    next();
  }
}

function interceptor(req, res, next) {
  if (req.url.startsWith('/courses') || req.url.startsWith('/login')) {
    next();
  } else if (req.user) {
    next();
  } else {
    next(new Error('Unauthorized'));
  }
}

// eslint-disable-next-line no-unused-vars
function errorHandler(error, req, res, _next) {
  res.status(401).send({ error });
  // res.cookie('loginReturnTo', req.fullUrl, {
  //   maxAge: 1000 * 3600 * 24,
  // });
  // res.redirect('/login');
}

module.exports = compose(userParser, interceptor, errorHandler);
