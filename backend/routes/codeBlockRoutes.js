const express = require('express');
const router = express.Router();
const CodeBlock = require('../controllers/blockCode');

router.get('/', CodeBlock.getCodeBlocksList);

router.get('/:id', CodeBlock.getCodeBlockById);

router.post('/', CodeBlock.newCodeBlock);

module.exports = router;
