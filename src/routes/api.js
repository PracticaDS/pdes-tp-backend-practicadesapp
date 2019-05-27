const { Router } = require('express');
const Factory = require('../models/factory');

const router = Router();

router.post('/:user/factory', (req, res) => {
  const factory = new Factory({ name: req.params.user, cantMachines: 0, updatedAt: Date.now() });
  return factory
    .save()
    .then(resFactory => res.status(200).json(resFactory))
    .catch(err => console.log(err));
});

router.get('/:user/factories', (req, res) =>
  Factory.find({ name: req.params.user })
    .then(factories => res.status(200).json(factories))
    .catch(err => res.status(400).json(err))
);

module.exports = router;
