const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const Prometheus = require('prom-client');

const api = require('../routes/api');

const requestCounter = new Prometheus.Counter({
  name: 'total_request_count',
  help: 'Cantidad de requests total'
});
const httpRequestDurationMicroseconds = new Prometheus.Histogram({
  name: 'http_request_duration_ms',
  help: 'Duration of HTTP requests in ms',
  labelNames: ['method', 'route', 'code'],
  buckets: [0.1, 5, 15, 50, 100, 200, 300, 400, 500]
  // buckets for response time from 0.1ms to 500ms
});

const { collectDefaultMetrics } = Prometheus;

// Probe every 5th second.
collectDefaultMetrics({ timeout: 5000 });

const app = express();

app.use(morgan('dev'));

app.use((req, res, next) => {
  requestCounter.inc();
  next();
});

// Runs before each requests
app.use((req, res, next) => {
  res.locals.startEpoch = Date.now();
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false, useNewUrlParser: true }));

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use('/api', api);

// Error handler
app.use((err, req, res, next) => {
  res.statusCode = 500;
  // Do not expose your error in production
  res.json({ error: err.message });
  next();
});

// Runs after each requests
app.use((req, res, next) => {
  const responseTimeInMs = Date.now() - res.locals.startEpoch;
  console.log(req.route);

  httpRequestDurationMicroseconds
    .labels(req.method, req.route.path, res.statusCode)
    .observe(responseTimeInMs);

  next();
});

module.exports = app;
