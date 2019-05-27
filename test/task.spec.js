const common = require('../src/config/common'),
  request = common.request,
  assert = common.assert,
  app = common.app,
  Factory = require('../src/models/factory');

it('should save a factory', done => {
  request(app)
    .post('/api/nahu/factory')
    .send({ name: 'factory1', src: 'a' })
    .expect(200, done);
});

it('should get a factory', done => {
  request(app)
    .post('/api/nahu/factory')
    .send({ name: 'factory1', src: 'a' })
    .expect(200)
    .then(() => {
      request(app)
        .get('/api/nahu/factories')
        .expect(200)
        .then(res => {
          assert.strictEqual(res.body.length, 1);
          done();
        });
    });
});

it('should get a factory with find db', done => {
  request(app)
    .post('/api/nahu/factory')
    .send({ name: 'factory1', src: 'a' })
    .expect(200)
    .then(() => {
      Factory.find().then(factories => {
        assert.strictEqual(factories.length, 1);
        done();
      });
    });
});

it('should get 100 machines', done => {
  request(app)
    .post('/api/nahu/factory')
    .send({ name: 'factory1', src: 'a' })
    .expect(200)
    .then(factory => {
      request(app)
        .get(`/api/${String(factory.body._id)}/machines`)
        .expect(200)
        .then(res => {
          assert.strictEqual(res.body.length, 100);
          done();
        });
    });
});

it('should remove a factory', done => {
  request(app)
    .post('/api/ivan/factory')
    .send({ name: 'factory1', src: 'a' })
    .expect(200)
    .then(factory => {
      request(app)
        .delete(`/api/${factory.body.user}/${factory.body.name}/factory`)
        .expect(200)
        .then(() => {
          Factory.find().then(factories => {
            assert.strictEqual(factories.length, 0);
            done();
          });
        });
    });
});
