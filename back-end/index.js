const express = require('express');
const logger = require('morgan');
const cookieParser = require('cookie-parser');

const middleware = require('./middleware');
const router = require('./routes');

const app = express();

app.use(logger('dev'));

app.use(cookieParser());

app.use(middleware);

app.use(express.json());

app.use(router);

const port = process.env.PORT || 7122;
app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});
