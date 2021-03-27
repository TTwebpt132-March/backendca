const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const authRouter = require('./routers/auth-router');
const recipesRouter = require('./routers/recipes-router');
const usersRouter = require('./routers/users-router');
const restricted = require('./middlewares/restricted');

const server = express();
server.use(express.json());
server.use(helmet());
server.use(cors());
server.use(cookieParser());

server.use('/api/auth/', authRouter);
server.use('/api/users/', restricted, usersRouter);
server.use('/api/recipes/', restricted, recipesRouter);

server.get('/', (req, res, next) => {
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
