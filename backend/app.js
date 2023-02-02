const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv').config();
const app = express();
const cors = require('cors');
const server = require('http').Server(app);
const port = process.env.PORT;

var io = require('socket.io')(server, {
	cors: {
		origin: 'http://localhost:3000/',
		methods: ['GET', 'POST'],
	},
});

//FIXME: fix connection

io.on('connection', (socket) => {
	console.log('clients connected');
});

// io.on('connection', (socket) => {
// 	socket.on('numberOfUsers', (data) => console.log(data));
// });

app.use(bodyParser.urlencoded({ extended: true, limit: '1mb' }));
app.use(bodyParser.json());

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

server.listen(port, () => {
	console.log('Server is running on port ' + port);
});
