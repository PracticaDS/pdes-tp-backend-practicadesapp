const mongoose = require('mongoose');
const { Mockgoose } = require('mockgoose');

const DB_URI = 'mongodb://localhost:27017/tp';

const connect = () => {
  if (process.env.NODE_ENV === 'test') {
    const mockgoose = new Mockgoose(mongoose);
    return mockgoose.prepareStorage().then(() => {
      return mongoose.connect(DB_URI, { useNewUrlParser: true });
    });
  } else {
    return mongoose.connect(DB_URI, { useNewUrlParser: true });
  }
};

const close = () => {
  return mongoose.disconnect();
};

const db = mongoose.connection;

module.exports = { connect, close, db };
