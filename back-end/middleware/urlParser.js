const url = require('url');

module.exports = (req, res, next) => {
  req.fullUrl = url.format({
    protocol: req.protocol,
    host: req.hostname,
    pathname: req.originalUrl,
  });
  next();
};
