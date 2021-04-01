const Recipes = require('../models/recipe-model');

const checkRecipeBody = (req, res, next) => {
	const { title, ingredients, instructions, category } = req.body;

	if (!Object.keys(req.body).length) {
		return res.status(409).json({
			message: 'Nothing was sent.'
		});
	}

	if (!title) {
		return res.status(409).json({
			message: 'Title is required.'
		});
	}

	if (!ingredients) {
		return res.status(409).json({
			message: 'Ingredients are required.'
		});
	}

	if (!instructions) {
		return res.status(409).json({
			message: 'instructions are required.'
		});
	}

	if (!category) {
		return res.status(409).json({
			message: 'Category is required.'
		});
	}

	next();
};

const checkRecipeId = async (req, res, next) => {
	try {
		const recipe = await Recipes.findById(req.params.id);
		if (!recipe) {
			return res.status(404).json({
				message: 'Recipe not found.'
			});
		}

		next();
	} catch (err) {
		next(err);
	}
};

module.exports = {
	checkRecipeId,
	checkRecipeBody
};
