const express = require('express');
const router = express.Router();
const CodeBlock = require('../controllers/blockCode');

router.get('/', CodeBlock.getCodeBlocksList);

router.get('/:title', CodeBlock.getCodeBlockByName);

router.post('/', CodeBlock.newCodeBlock);

module.exports = router;
