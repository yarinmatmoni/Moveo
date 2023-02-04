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

const getCodeBlockById = async (req, res) => {
	if (req.params.id === null || req.params.id === undefined) {
		res.status(400).send({
			status: 'Fail',
			error: error.message,
		});
	}

	try {
		const codeBlock = await CodeBlock.findOne({ id: req.params.id });
		res.status(200).send({ data: codeBlock });
	} catch (error) {
		res.status(400).send({
			status: 'Fail',
			error: error.message,
		});
	}
};

module.exports = { getCodeBlocksList, getCodeBlockById };
