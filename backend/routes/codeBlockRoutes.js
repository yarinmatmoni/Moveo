const express = require('express');
const router = express.Router();
const CodeBlock = require('../controllers/blockCode');

router.get('/:id', CodeBlock.getCodeBlockById);

module.exports = router;
