const db = require('../data/db-config');

// get all recipes
const find = () => {
	return db('recipes');
};

// get recipe by id
const findById = recipe_id => {
	return db('recipes').where({ recipe_id }).first();
};

// creates a recipe
const add = async recipe => {
	const [recipe_id] = await db('recipes').insert(recipe).returning('recipe_id');
	return findById(recipe_id);
};

// update recipe
const update = async (recipe, id) => {
	console.log(recipe, id);
	const [recipe_id] = await db('recipes').update(recipe).where('recipe_id', id).returning('recipe_id');
	return findById(recipe_id);
};

// delete a recipe
const nuke = id => {
	console.log(id);
	return db('recipes').where({ recipe_id: id }).del();
};

module.exports = {
	find,
	findById,
	add,
	update,
	nuke
};
