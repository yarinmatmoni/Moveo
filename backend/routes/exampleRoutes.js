const express = require('express');
const router = express.Router();
const Example = require('../controllers/example');

router.get('/', Example.getExamplesList);

router.get('/:id', Example.getExampleById);

router.post('/', Example.newTest);

module.exports = router;
