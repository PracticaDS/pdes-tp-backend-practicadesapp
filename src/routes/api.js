const { Router } = require('express');

const router = Router();

router.get('/a', (req, res) => {
  res.status(200).json([{ name: 'nahu' }]);
});

module.exports = router;
