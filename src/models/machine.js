const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const Schema = mongoose.Schema;

const MachineSchema = new Schema({
  className: {
    type: String,
    required: true
  },
  src: {
    type: String,
    required: true
  },
  alt: {
    type: String,
    required: true
  },
  position: {
    type: Number,
    required: true
  },
  rawMaterials: {
    type: [Number],
    default: []
  },
  typeMachine: {
    type: String,
    required: true
  },
  rawMaterialStarter: {
    type: Number,
    required: true
  },
  direction: {
    type: String,
    required: true
  },
  value: {
    type: Number,
    required: true
  },
  crafterMaterials: {
    type: [Number],
    default: []
  },
  crafterReturn: {
    type: Number,
    required: true
  },
  factoryId: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Machine', MachineSchema);
