const express = require('express');
const router = express.Router();
const CodeBlock = require('../controllers/blockCode');

router.get('/', CodeBlock.getCodeBlocksList);

module.exports = router;
