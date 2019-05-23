const { Router } = require('express');
const Factory = require('../models/factory');

const router = Router();

router.post('/factory', (req, res) => {
  const factory = new Factory(req.body);
  return factory
    .save()
    .then(resFactory => res.status(200).json(resFactory))
    .catch(err => console.log(err));
});

router.get('/factories', (req, res) => {
  return Factory.find({}).exec((error, factories) => {
    console.log(factories);
    if (error) return res.status(400).json(error);
    return res.status(200).json(factories);
  });
});

module.exports = router;
