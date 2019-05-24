const mongoose = require('mongoose');

const DB_URI = 'mongodb://localhost/tp';

const DB_URI_TEST = 'mongodb://localhost/tp_test';

const connect = () =>
  mongoose.connect(process.env.NODE_ENV === 'test' ? DB_URI_TEST : DB_URI, { useNewUrlParser: true });

const close = () => {
  return mongoose.disconnect();
};

const db = mongoose.connection;

module.exports = { connect, close, db };
