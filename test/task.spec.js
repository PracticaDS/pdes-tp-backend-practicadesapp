const common = require('../src/config/common'),
  request = common.request,
  assert = common.assert,
  app = common.app,
  Factory = require('../src/models/factory');

it('should save a factory', done => {
  request(app)
    .post('/api/factory')
    .send({ name: 'nahu', cantMachines: 2, updatedAt: Date() })
    .expect(200, done);
});

it('should get a factory', done => {
  request(app)
    .get('/api/factories')
    .expect(200)
    .then(res => {
      assert.strictEqual(res.body.length, 1);
      done();
    });
});

it('should get a factory', done => {
  Factory.find({ name: 'nahu' }).then(factories => {
    assert.strictEqual(factories.length, 1);
    done();
  });
});
