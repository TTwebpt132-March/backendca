const express = require('express');
const Users = require('../models/user-model');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { checkBodyRegister, checkBodyLogin, checkUsernameExists } = require('../middlewares/auth-middeware');

// Register User
router.post('/register', checkBodyRegister, checkUsernameExists, async (req, res, next) => {
	try {
		const { username, password, email } = req.body;
		const newUser = await Users.add({
			username,
			password: await bcrypt.hash(password, 14),
			email
		});

		res.status(201).json(newUser);
	} catch (err) {
		next(err);
	}
});

// Login User
router.post('/login', checkBodyLogin, async (req, res, next) => {
	try {
		const { username } = req.body;
		const user = await Users.findBy({ username }).first();

		const token = jwt.sign(
			{
				userID: user.user_id,
				username: user.username
			},
			process.env.SECRET
		);

		res.cookie('token', token);
		res.json({
			message: `Welcome, ${user.username}`,
			token: `${token}`
		});
	} catch (err) {
		next(err);
	}
});

module.exports = router;
