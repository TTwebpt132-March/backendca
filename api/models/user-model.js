const db = require('../data/db-config');

// gets all users
const find = () => {
	return db('users');
};

// gets user by id
const findById = id => {
	return db('users').select('user_id', 'user_username', 'user_password', 'user_email').where({ user_id: id }).first();
};

// gets user by filter ('username, id or password')
const findBy = filter => {
	console.log(filter);
	return db('users').select('user_id', 'user_username', 'user_password', 'user_email').where(filter);
};

const update = async (body, id) => {
	const [user_id] = await db('users').update(body).where('user_id', id).returning('user_id');
	return findById(user_id);
};

// creates a user
async function add(user) {
	const [user_id] = await db('users').insert(user).returning('user_id');
	return findById(user_id);
}

// delete user
const nuke = user_id => {
	return db('users').where({ user_id }).del();
};

// gets users recipes
const userRecipes = async id => {
	console.log(id);
	const user = await db('users as u').where('u.user_id', id).select('u.user_id', 'u.user_username').debug();

	const recipes = await db('recipes as r').where('r.user_id', id).select('r.*');

	console.log(user);
	const result = {
		user_id: user[0].user_id,
		user_username: user[0].user_username,
		recipes: recipes.map(rec => {
			return {
				id: rec.recipe_id,
				title: rec.recipe_title,
				recipe_source: rec.recipe_source,
				recipe_ingredients: rec.recipe_ingredients,
				recipe_instructions: rec.recipe_instructions,
				recipe_category: rec.recipe_category,
				recipe_photo_src: rec.recipe_photo_src
			};
		})
	};

	return result;
};

// exports functions
module.exports = {
	find,
	findById,
	findBy,
	update,
	add,
	nuke,
	userRecipes
};
