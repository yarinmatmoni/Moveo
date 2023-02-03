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

const newCodeBlock = (req, res) => {
	const newCodeBlock = new CodeBlock({
		title: req.body.title,
		code: req.body.code,
		href: req.body.href,
	});

	newCodeBlock.save((error, newCodeBlock) => {
		if (error) {
			res.status(400).send({
				status: 'Fail',
				error: error.message,
			});
		} else {
			res.status(200).send({
				status: 'OK',
				newCodeBlock: newCodeBlock,
			});
		}
	});
};

module.exports = { getCodeBlocksList, newCodeBlock, getCodeBlockByName };
