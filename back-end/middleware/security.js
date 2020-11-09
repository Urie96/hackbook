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

function needAuth(url) {
  if (url.includes('blue')) {
    return true;
  }
  if (url.includes('articleContent')) {
    return true;
  }
  if (url.includes('userservice')) {
    return true;
  }
  return false;
}

function interceptor(req, res, next) {
  if (req.user) {
    next();
  } else if (needAuth(req.url)) {
    next(new Error('Unauthorized'));
  } else {
    next();
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
