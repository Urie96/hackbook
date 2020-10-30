const express = require('express');
const bodyParser = require('body-parser');
const jsonRouter = require('./jsonServer.js');
const { generateToken } = require('../interceptor/jwt.js');

const router = express.Router();

router.use(bodyParser.json());

router.post('/login', (req, res) => {
  const { phone } = req.body;
  if (phone !== '17828228827') {
    res.json({ error: '用户名或密码不正确' });
    return;
  }

  const token = generateToken({ phone, id: 1 });
  res.setHeader('set-authorization', token);
  res.json({ message: 'success' });
});

router.use(jsonRouter);

module.exports = router;
