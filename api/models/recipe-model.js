const db = require('../data/db-config');

// get all recipes
const find = async () => {
	const recipes = await db('recipes');

	const result = recipes.map(rec => {
		return {
			id: rec.recipe_id,
			title: rec.recipe_title,
			recipe_source: rec.recipe_source,
			recipe_ingredients: rec.recipe_ingredients.split(',').map(i => i.replace(/[{}""]/g, '')),
			recipe_instructions: rec.recipe_instructions,
			recipe_category: rec.recipe_category.split(',').map(i => i.replace(/[{}""]/g, '')),
			recipe_photo_src: rec.recipe_photo_src
		};
	});

	return result;
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
	const [recipe_id] = await db('recipes').update(recipe).where('recipe_id', id).returning('recipe_id');
	return findById(recipe_id);
};

// delete a recipe
const nuke = id => {
	return db('recipes').where({ recipe_id: id }).del();
};

module.exports = {
	find,
	findById,
	add,
	update,
	nuke
};
