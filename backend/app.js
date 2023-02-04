require('dotenv').config();
const bodyParser = require('body-parser');
const cors = require('cors');
const port = process.env.PORT;
const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const initialDB = require('./db');

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true, limit: '1mb' }));
app.use(bodyParser.json());

initialDB();

const codeBlockRouter = require('./routes/codeBlockRoutes');
app.use('/codeBlock', codeBlockRouter);

/* ************************************************************************************ */
//FIXME: recognize who is the mentor an who is the student

io.on('connection', (socket) => {
	console.log(io.engine.clientsCount);
	io.emit('clientCount', io.engine.clientsCount);

	// listen to change from page one and emit for the second page
	socket.on('codeChange', (data) => {
		socket.broadcast.emit('sendEditCode', data);
	});

	socket.on('disconnect', () => {
		console.log('user disconnected' + io.engine.clientsCount);
		io.emit('clientCount', io.engine.clientsCount);
	});
});

/* ************************************************************************************ */

http.listen(port, () => {
	console.log('Server is running on port ' + port);
});
