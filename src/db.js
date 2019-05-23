const mongoose = require('mongoose');
const { Mockgoose } = require('mockgoose');

const DB_URI = 'mongodb://localhost:27017/tp';

const connect = () => {
  if (process.env.NODE_ENV === 'test') {
    const mockgoose = new Mockgoose(mongoose);
    return mockgoose.prepareStorage().then(() => {
      return mongoose.connect(DB_URI);
    });
  } else {
    return mongoose.connect(DB_URI);
  }
};

const close = () => {
  return mongoose.disconnect();
};

module.exports = { connect, close };