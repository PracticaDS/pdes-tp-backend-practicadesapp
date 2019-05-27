const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const api = require('../routes/api');

const app = express();

app.use(morgan('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false, useNewUrlParser: true }));

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use('/api', api);

module.exports = app;
