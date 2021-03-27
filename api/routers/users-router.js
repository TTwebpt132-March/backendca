const express = require('express');
const Users = require('../models/user-model');
const bcrypt = require('bcryptjs');
const router = express.Router();

// get all users
router.get('/', async (req, res, next) => {
	try {
		const users = await Users.find();
		res.json(users);
	} catch (err) {
		next(err);
	}
});

// get user by id
router.get('/:id', async (req, res, next) => {
	try {
		const user = await Users.findById(req.params.id);
		res.json(user);
	} catch (err) {
		next(err);
	}
});

// update user
router.put('/:id', async (req, res, next) => {
	try {
		const { id } = req.params;
		const { username: user_username, password: user_password, email: user_email } = req.body;
		const updatedUser = await Users.update(
			{
				user_username,
				user_password: await bcrypt.hash(user_password, process.env.TIMES),
				user_email
			},
			id
		);
		res.json(updatedUser);
	} catch (err) {
		next(err);
	}
});

// delete user
router.delete('/:id', async (req, res, next) => {
	try {
		const user = await Users.nuke(req.params.id);
		res.json({
			message: `${user.user_name} was successfully nuked!`
		});
	} catch (err) {
		next(err);
	}
});

// get user's recipes
router.get('/:id/recipes', async (req, res, next) => {
	try {
		const recipes = await Users.userRecipes(req.params.id);

		res.json(recipes);
	} catch (err) {
		next(err);
	}
});

module.exports = router;
