const app = require('./src/config/server');
const db = require('./src/config/db');

require('dotenv').config();

const port = process.env.PORT || 3001;

db.connect().then(() => {
  app.listen(port, () => {
    console.log(`api is listening on port ${port}`);
  });
});

module.exports = app;
