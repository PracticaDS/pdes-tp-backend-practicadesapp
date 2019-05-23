const common = require('./common'),
  request = common.request,
  assert = common.assert,
  app = common.app;

it('should get status ok', done => {
  request(app)
    .get('/api/a')
    .expect(200)
    .then(res => {
      assert.strictEqual(res.body.length, 0);
      done();
    });
});
