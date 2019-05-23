process.env.NODE_ENV = 'test';

const { connect, close } = require('../src/config/db');

function importTest(name, path) {
  describe(name, () => {
    require(path);
  });
}

describe('/tests/main.js', () => {
  before(done => {
    connect()
      .then(() => done())
      .catch(err => done(err));
  });

  importTest('Factories', './task.spec.js');

  after(done => {
    close()
      .then(() => done())
      .catch(err => done(err));
  });
});
