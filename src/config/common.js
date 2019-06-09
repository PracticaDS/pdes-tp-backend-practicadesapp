const request = require('supertest');
const assert = require('assert');
const app = require('./server');

const storage = {
  userToken: null
};

function setStorage(prop, val) {
  storage[prop] = val;
}

exports.request = request;
exports.assert = assert;
exports.app = app;

exports.storage = storage;
exports.setStorage = setStorage;
