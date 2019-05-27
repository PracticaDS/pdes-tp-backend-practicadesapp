const common = require('../src/config/common'),
  request = common.request,
  assert = common.assert,
  app = common.app,
  { sortBy } = require('lodash'),
  Factory = require('../src/models/factory'),
  Machine = require('../src/models/machine');

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
        .get(`/api/${String(factory.body.factory._id)}/machines`)
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
        .delete(`/api/${factory.body.factory._id}/factory`)
        .expect(200)
        .then(() => {
          Factory.find().then(factories => {
            assert.strictEqual(factories.length, 0);
            done();
          });
        });
    });
});

it('should update machines', done => {
  request(app)
    .post('/api/ivan/factory')
    .send({ name: 'factory1', src: 'a' })
    .expect(200)
    .then(factory => {
      request(app)
        .put(`/api/machines`)
        .send(
          Array.from({ length: 100 }).map((_, position) => ({
            _id: factory.body.machines[position]._id,
            className: 'dpiece',
            src: 'algo',
            alt: '1',
            position,
            rawMaterials: [],
            typeMachine: 'crafter',
            rawMaterialStarter: -1,
            direction: 'd',
            value: position + 100,
            crafterMaterials: [],
            crafterReturn: -1,
            factoryId: String(factory.body.factory._id)
          }))
        )
        .expect(200)
        .then(() => {
          Machine.find().then(machines => {
            assert.strictEqual(machines.length, 100);
            sortBy(machines, m => m.position).forEach((machine, index) => {
              assert.strictEqual(machine.value, index + 100);
            });
            done();
          });
        });
    });
});
