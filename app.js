const app = require('./src/server');
const db = require('./src/db');

require('dotenv').config();

const port = process.env.PORT || 3001;

db.connect().then(() => {
  app.listen(port, () => {
    console.log(`api is listening on port ${port}`);
  });
});

module.exports = app;
