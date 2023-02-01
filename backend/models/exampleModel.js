const mongoose = require('mongoose');

//FIXME: change the fields of schema
const exampleSchema = new mongoose.Schema({
	name: {
		type: 'string',
		required: true,
	},
	massage: {
		type: 'string',
		required: true,
	},
});

module.exports = mongoose.model('Example', exampleSchema);
