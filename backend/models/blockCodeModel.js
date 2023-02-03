const mongoose = require('mongoose');

const codeBlockSchema = new mongoose.Schema({
	id: {
		type: 'string',
		required: true,
	},
	title: {
		type: 'string',
		required: true,
	},
	code: {
		type: 'string',
		required: true,
	},
	href: {
		type: 'string',
		required: true,
	},
});

module.exports = mongoose.model('CodeBlock', codeBlockSchema);

//TODO: i already add id to model, now need to fix getCodeBlockByName
