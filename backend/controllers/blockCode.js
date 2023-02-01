const CodeBlock = require('../models/blockCodeModel');

const getCodeBlocksList = async (req, res) => {
	try {
		const blockCodesList = await CodeBlock.find();
		res.status(200).send(blockCodesList);
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
		const codeBlock = await CodeBlock.findById(req.params.id);
		res.status(200).send(codeBlock);
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

module.exports = { getCodeBlocksList, getCodeBlockById, newCodeBlock };
