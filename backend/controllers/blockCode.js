const CodeBlock = require('../models/blockCodeModel');

const getCodeBlocksList = async (req, res) => {
	try {
		const blockCodesList = await CodeBlock.find();
		res.status(200).send({ data: blockCodesList });
	} catch (error) {
		res.status(400).send({
			status: 'Fail',
			error: error.message,
		});
	}
};

const getCodeBlockByName = async (req, res) => {
	if (req.params.title === null || req.params.title === undefined) {
		res.status(400).send({
			status: 'Fail',
			error: error.message,
		});
	}

	try {
		const codeBlock = await CodeBlock.findOne({ title: req.params.title });
		res.status(200).send({ data: codeBlock });
	} catch (error) {
		res.status(400).send({
			status: 'Fail',
			error: error.message,
		});
	}
};

module.exports = { getCodeBlocksList, getCodeBlockByName };
