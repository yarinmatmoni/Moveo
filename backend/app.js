const bodyParser = require('body-parser');
const dotenv = require('dotenv').config();
const cors = require('cors');
const port = process.env.PORT;
const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const dataBase = require('./db');

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true, limit: '1mb' }));
app.use(bodyParser.json());

dataBase();

const indexRouter = require('./routes/index');
app.use('/', indexRouter);

const codeBlockRouter = require('./routes/codeBlockRoutes');
app.use('/codeBlock', codeBlockRouter);

/* ************************************************************************************ */
//FIXME: recognize who is the mentor an who is the student

let clientCount = 0;

io.on('connection', (socket) => {
	console.log('a user connected');
	clientCount++;
	io.emit('clientCount', clientCount);

	// listen to change from page one and emit for the second page
	socket.on('codeChange', (data) => {
		socket.broadcast.emit('sendEditCode', data);
	});

	socket.on('disconnect', () => {
		console.log('user disconnected');
		clientCount--;
		io.emit('clientCount', clientCount);
	});
});

/* ************************************************************************************ */

http.listen(port, () => {
	console.log('Server is running on port ' + port);
});
