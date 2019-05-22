const supertest = require('supertest');
const server = require('../app');
const assert = require('assert');

describe('tests', function() {
  it('should get status ok', function(done) {
    supertest(server)
      .get('/api/a')
      .expect(200)
      .then(res => {
        assert.strictEqual(res.body.length, 4);
        done();
      });
  });
});
