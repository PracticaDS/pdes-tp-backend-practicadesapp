const request = require('supertest');
const server = require('../src/server');
const assert = require('assert');

describe('tests', () => {
  it('should get status ok', () => {
    return request(server)
      .get('/api/a')
      .expect(200)
      .then(res => {
        assert.strictEqual(res.body.length, 1);
      });
  });
});
