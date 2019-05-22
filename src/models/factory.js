const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const Schema = mongoose.Schema;

const FactorySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  cantMachines: {
    type: Number,
    required: true
  },
  updatedAt: {
    type: Date,
    required: true
  }
});

module.exports = mongoose.model('Factory', FactorySchema);
