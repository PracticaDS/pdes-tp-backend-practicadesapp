const { Router } = require('express');
const Factory = require('../models/factory');

const router = Router();

router.post('/a', (req, res) => {
  console.log('factories');
  const factory = new Factory({ name: 'nahu', cantMachines: 2, updatedAt: Date() });
  return factory
    .save()
    .then(function(factories) {
      return res.status(200).json('saved');
    })
    .catch(err => console.log(err));
});

router.get('/a', (req, res) => {
  console.log('factories');
  return Factory.find({}).exec(function(error, factories) {
    console.log(factories);
    if (error) return res.status(400).json(error);
    return res.status(200).json(factories);
  });
});

module.exports = router;
