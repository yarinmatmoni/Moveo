const Example = require('../models/exampleModel');

//FIXME: example to GET method
const getExamplesList = async (req, res) => {
	try {
		const examplesList = await Example.find();
		res.status(200).send(examplesList);
	} catch (error) {
		res.status(400).send({
			status: 'Fail',
			error: error.message,
		});
	}
};

//FIXME: example to GET method by id
const getExampleById = async (req, res) => {
	if (req.params.id === null || req.params.id === undefined) {
		res.status(400).send({
			status: 'Fail',
			error: error.message,
		});
	}

	try {
		const example = await Example.findById(req.params.id);
		res.status(200).send(example);
	} catch (error) {
		res.status(400).send({
			status: 'Fail',
			error: error.message,
		});
	}
};

//FIXME: example to POST method
const newTest = (req, res) => {
	const example = new Example({
		name: req.body.name,
		massage: req.body.massage,
	});

	example.save((error, example) => {
		if (error) {
			res.status(400).send({
				status: 'Fail',
				error: error.message,
			});
		} else {
			res.status(200).send({
				status: 'OK',
				example: example,
			});
		}
	});
};

module.exports = { getExamplesList, getExampleById, newTest };
