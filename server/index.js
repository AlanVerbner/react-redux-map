/* eslint consistent-return:0 */

const express = require('express');
const logger = require('./logger');

const setup = require('./middlewares/frontendMiddleware');
const resolve = require('path').resolve;

// If you need a backend, e.g. an API, add your custom backend-specific middleware here
// app.use('/api', myApi);

// In production we need to pass these values in instead of relying on webpack
const app = setup(express(), {
  outputPath: resolve(process.cwd(), 'build'),
  publicPath: '/',
});

const port = process.env.PORT || 3000;

// Start your app.
app.listen(port, (err) => {
  if (err) {
    return logger.error(err.message);
  }

  logger.appStarted(port);
});
