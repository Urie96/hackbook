const jwt = require('jsonwebtoken');
const http = require('http');
const { SSO_VERIFYCODE, SSO_AUTH, JWT_SECRET } = require('../constants');

function succeedLogin(req, res, shouldRedirect) {
  const token = jwt.sign({ user: req.user }, JWT_SECRET, { expiresIn: '2d' });
  res.cookie('token', token, { maxAge: 1000 * 3600 * 24 * 3 });
  if (shouldRedirect) {
    const returnTo = req.cookies.loginReturnTo;
    res.cookie('loginReturnTo', '', { maxAge: 0 });
    res.redirect(returnTo);
  } else {
    res.send({ message: 'success' });
  }
}

function failLogin(error, req, res) {
  const url = new URL(SSO_AUTH);
  url.searchParams.set('redirectTo', process.env.SSO_RETURN);
  res.status(401).send({ error, redirect: url });
}

function httpGet(url) {
  return new Promise((resolve, reject) => {
    const req = http.get(url, (res) => {
      res.on('data', (body) => {
        try {
          resolve(JSON.parse(body.toString()));
        } catch (err) {
          reject(err);
        }
      });
      res.on('error', (err) => {
        reject(err);
      });
    });
    req.on('error', (err) => {
      reject(err);
    });
    req.end();
  });
}

function verifyCode(code) {
  const url = new URL(SSO_VERIFYCODE);
  url.searchParams.set('code', code);
  return httpGet(url).then((data) => {
    if (data.error) {
      return Promise.reject(new Error(data.error));
    }
    return data;
  });
}

module.exports = (req, res) => {
  if (req.user) {
    succeedLogin(req, res, false);
    return;
  }
  res.cookie('loginReturnTo', req.query.loginReturnTo, {
    maxAge: 1000 * 3600 * 24,
  });
  if (req.query.code) {
    verifyCode(req.query.code)
      .then((data) => {
        req.user = data;
        succeedLogin(req, res, true);
      })
      .catch((err) => {
        failLogin(err, req, res);
      });
  } else {
    const err = new Error('query code required');
    failLogin(err, req, res);
  }
};
