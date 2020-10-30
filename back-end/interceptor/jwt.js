const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');

const secret = '$@Dfhf*3!@#dfg.';

function generateToken(payload) {
  const sign = jwt.sign(payload, secret, { expiresIn: 3600 * 24 * 2 });
  return `Bearer ${sign}`;
}

const jwtValidator = expressJwt({
  secret,
  algorithms: ['HS256'],
});

module.exports = {
  generateToken,
  jwtValidator,
};
