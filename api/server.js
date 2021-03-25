const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const authRouter = require('./routers/auth-router');

const server = express();
server.use(express.json());
server.use(helmet());
server.use(cors());

server.use('/api/auth/', authRouter);

server.get('/api', (req, res, next) => {
	res.json({
		message: 'Welcome!'
	});
});

server.use((err, req, res, next) => {
	console.log(err);
	res.status(500).json({
		message: 'Something went wrong.'
	});
});

module.exports = server;
