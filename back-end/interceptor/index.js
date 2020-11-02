const express = require('express');
const { generateToken, jwtValidator } = require('./jwt.js');

const router = express.Router();

router.use(
  jwtValidator.unless({ path: ['/login', '/courses'], useOriginalUrl: false }),
);
// eslint-disable-next-line no-unused-vars
router.use((err, _req, res, _next) => {
  res.status(401).json({ error: err.message });
});

router.use((req, res, next) => {
  if (req.user) {
    // pass the jwt validate, so refresh token
    if (new Date() / 1000 - req.user.iat > 2 * 60 * 60) {
      // avoid refresh frequently
      delete req.user.iat;
      delete req.user.exp;
      const token = generateToken(req.user);
      res.setHeader('set-authorization', token);
    }
  }
  next();
});

module.exports = router;
