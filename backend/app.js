require('dotenv').config();
const bodyParser = require('body-parser');
const port = process.env.PORT;
const express = require('express');
const app = express();
const http = require('http');
const { Server } = require('socket.io');
const server = http.createServer(app);
const initialDB = require('./db');

const io = new Server(server, {
	cors: {
		origin: 'http://localhost:3000',
		methods: ['GET'],
	},
});

app.use(bodyParser.urlencoded({ extended: true, limit: '1mb' }));
app.use(bodyParser.json());

initialDB();

const codeBlockRouter = require('./routes/codeBlockRoutes');
app.use('/codeBlock', codeBlockRouter);

let numOfClients = 0;

io.on('connection', (socket) => {
	numOfClients += 1;
	socket.emit('clientsCounter', numOfClients);

	socket.on('disconnect', () => {
		numOfClients -= 1;
	});

	socket.on('codeChange', (data) => {
		io.emit('sendEditCode', data.data);
	});
});

server.listen(port, () => {
	console.log('Server is running on port ' + port);
});
