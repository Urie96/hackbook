const express = require('express');
const logger = require('morgan');
const interceptor = require('./interceptor');
const router = require('./routes');

const app = express();

app.use(logger('dev'));

app.use(interceptor);

app.use(router);

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`JSON Server is running at ${port}`);
});
