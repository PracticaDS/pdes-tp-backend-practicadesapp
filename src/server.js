const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const api = require('./routes/api');

const app = express();

app.use(morgan('dev'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api', api);

module.exports = app;
