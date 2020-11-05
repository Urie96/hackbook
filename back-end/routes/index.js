const express = require('express');
const jsonRouter = require('./jsonServer.js');
const login = require('./login.js');

const router = express.Router();

router.get('/login', login);

router.use(jsonRouter);

module.exports = router;
