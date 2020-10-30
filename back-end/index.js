const express = require('express');
const history = require('connect-history-api-fallback');
const interceptor = require('./interceptor');
const router = require('./routes');
const { STATIC_FILE } = require('./constants');

const app = express();

app.use(interceptor);

app.use('/api', router);

app.use(history());
app.use(express.static(STATIC_FILE));

const port = process.env.PORT || 7122;
app.listen(port, () => {
  console.log(`JSON Server is running at ${port}`);
});
