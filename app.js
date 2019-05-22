const app = require('./src/server');
const mongoose = require('mongoose');

require('dotenv').config();

const port = process.env.PORT || 3001;

const dburl = 'mongodb://localhost/tp';
mongoose.connect(dburl, { useNewUrlParser: true }).then(
  () => {
    console.log('Connected to MongoDB');
  },
  err => {
    console.log(`MongoDB connection failed: ${err}`);
    process.exit(1);
  }
);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = app;
