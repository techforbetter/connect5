const boom = require('boom');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const logger = require('morgan');
require('dotenv').config();

console.log(process.env.MONGO_URI);
const router = require('./router');
const dbConnection = require('./database/dbConnection');

const app = express();

// connect to DB
dbConnection();

const port = process.env.PORT || 4000;
app.set('port', port);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(expressValidator());

app.use('/api', router);

if (process.env.NODE_ENV === 'production') {
  // serve any static files
  app.use(express.static(path.join(__dirname, '..', 'client', 'build')));

  // Handle React routing, resturn all requests to React app
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'));
  });
}

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(boom.notFound('Not Found'));
});

// error handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  // send the error object
  if (err.isBoom) {
    // for boom errors
    res.status(err.output.statusCode || 500);
  } else {
    // for unexpected internal server errors
    res.status(err.statusCode || 500);
  }
  res.json({ error: err.message });
});

module.exports = app;
