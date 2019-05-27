const { Router } = require('express');
const Factory = require('../models/factory');
const Machine = require('../models/machine');
const getNewMachines = require('../data/machines');

const router = Router();

router.post('/:user/factory', (req, res) => {
  const factory = new Factory({
    user: req.params.user,
    name: req.body.name,
    cantMachines: 0,
    updatedAt: Date.now()
  });
  return factory
    .save()
    .then(resFactory => {
      const machines = getNewMachines(String(resFactory._id), req.body.src);
      machines[24] = Object.assign({}, machines[24], { className: 'dselected' });
      return Promise.all(machines.map(machine => new Machine(machine).save())).then(() =>
        res.status(200).json(resFactory)
      );
    })
    .catch(err => res.status(400).json(err));
});

router.get('/:user/factories', (req, res) =>
  Factory.find({ user: req.params.user })
    .then(factories => res.status(200).json(factories))
    .catch(err => res.status(400).json(err))
);

router.get('/:factoryId/machines', (req, res) =>
  Machine.find({ factoryId: req.params.factoryId })
    .then(factories => res.status(200).json(factories))
    .catch(err => res.status(400).json(err))
);

router.delete('/:user/:name/factory', (req, res) =>
  Factory.deleteOne({ user: req.params.user, name: req.params.name }, error =>
    error ? res.status(400).json(error) : res.status(200).json('factory removed')
  )
);

module.exports = router;
