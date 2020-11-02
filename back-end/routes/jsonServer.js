const express = require('express');
const jsonServer = require('json-server');
const getData = require('../data/index.js');
const { USERSERVICE_PATH } = require('../constants');

const router = express.Router();
router.use('/userservice', (req, res, next) => {
  switch (req.method) {
    case 'POST':
      req.body.userId = req.user.id;
      break;
    case 'GET':
      req.query.userId = String(req.user.id);
      break;
    default:
      break;
  }
  next();
});

router.use('/userservice', jsonServer.router(USERSERVICE_PATH));

const data = getData();
router.use(jsonServer.router(data));

module.exports = router;
