const Users = require('../models/user-model');
const bcrypt = require('bcryptjs');

const checkBodyRegister = (req, res, next) => {
	const { username, password } = req.body;

	// checks if there is a body
	if (Object.keys(req.body).length < 1) {
		return res.status(401).json({
			message: 'Username, password and email are required.'
		});
	}

	// checks if there is a username
	if (!username) {
		return res.status(401).json({
			message: 'Username is required.'
		});
	}

	// checks for sername length
	if (username.length < 3 || username.length >= 15) {
		return res.status(401).json({
			message: 'Username must have at least 3 characters and less then 15 characters'
		});
	}

	// checks for password length
	if (password.length < 3) {
		return res.status(401).json({
			message: 'Password must have at least 3 characters.'
		});
	}

	next();
};

const checkBodyLogin = async (req, res, next) => {
	const { username, password } = req.body;

	if (!username || !password) {
		return res.status(401).json({
			message: 'Username and password required.'
		});
	}

	const user = await Users.findBy({ username }).first();
	const passwordValid = await bcrypt.compare(password, user.password);

	if (!user || !passwordValid) {
		return res.status(401).json({
			message: 'Invalid Credentials.'
		});
	}

	next();
};

const checkUsernameExists = async (req, res, next) => {
	try {
		const { username } = req.body;

		const user = await Users.findBy({ username });
		console.log(user);
		if (user.length > 1) {
			return res.status(409).json({
				message: 'Username is taken.'
			});
		}

		next();
	} catch (err) {
		next(err);
	}
};

module.exports = {
	checkBodyRegister,
	checkBodyLogin,
	checkUsernameExists
};
