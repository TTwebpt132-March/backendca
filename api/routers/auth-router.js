const express = require('express');
const Users = require('../models/user-model');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { checkBodyRegister, checkBodyLogin, checkUsernameExists } = require('../middlewares/auth-middeware');

// Register User
router.post('/register', checkBodyRegister, checkUsernameExists, async (req, res, next) => {
	try {
		const { username: user_username, password: user_password, email: user_email } = req.body;
		const newUser = await Users.add({
			user_username,
			user_password: await bcrypt.hash(user_password, process.env.TIMES),
			user_email
		});

		res.status(201).json(newUser);
	} catch (err) {
		next(err);
	}
});

// Login User
router.post('/login', checkBodyLogin, async (req, res, next) => {
	try {
		const { username: user_username } = req.body;

		const user = await Users.findBy({ user_username }).first();

		const token = jwt.sign(
			{
				userID: user.user_id,
				username: user.user_username
			},
			process.env.SECRET
		);

		res.cookie('token', token).send('ok');
		res.json({
			message: `Welcome, ${user.user_username}`,
			token: `${token}`
		});
	} catch (err) {
		next(err);
	}
});

module.exports = router;
