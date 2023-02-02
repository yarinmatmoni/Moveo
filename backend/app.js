const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv').config();
const cors = require('cors');
const port = process.env.PORT;
const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

let clientCount = -1;

io.on('connection', (socket) => {
	console.log('a user connected');
	clientCount++;
	io.emit('clientCount', clientCount);

	socket.on('disconnect', () => {
		console.log('user disconnected');
		clientCount--;
		io.emit('clientCount', clientCount);
	});
});

app.use(cors());

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

http.listen(port, () => {
	console.log('Server is running on port ' + port);
});
