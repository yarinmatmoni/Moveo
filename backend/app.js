const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv').config();
const app = express();
const cors = require('cors');

const port = process.env.PORT;

app.use(bodyParser.urlencoded({ extended: true, limit: '1mb' }));
app.use(bodyParser.json());

// allows resources to be requested from another domain
app.use(cors({ origin: 'http://localhost:3000' }));

// connect to mongoDB
mongoose.set('strictQuery', false);
mongoose.connect(process.env.DATABASE_URL);

const db = mongoose.connection;
db.on('error', (error) => {
	console.log(error);
});

db.once('open', () => {
	console.log('Connected to mongoDB');
});

const indexRouter = require('./routes/index');
app.use('/', indexRouter);

const codeBlockRouter = require('./routes/codeBlockRoutes');
app.use('/codeBlock', codeBlockRouter);

app.listen(port, () => {
	console.log('Server is running on port ' + port);
});
