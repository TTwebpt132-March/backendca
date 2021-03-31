const express = require('express');
const Recipes = require('../models/recipe-model');

const { checkRecipeId, checkRecipeBody } = require('../middlewares/recipe-middleware');
const router = express.Router();

// get all the recipes
router.get('/', async (req, res, next) => {
	try {
		const recipes = await Recipes.find();

		res.json(recipes);
	} catch (err) {
		next(err);
	}
});

// get recipe by id
router.get('/:id', checkRecipeId, async (req, res, next) => {
	try {
		const recipe = await Recipes.findById(req.params.id);
		res.json(recipe);
	} catch (err) {
		next(err);
	}
});

// create a recipe
router.post('/', checkRecipeBody, async (req, res, next) => {
	try {
		const {
			user_id,
			title: recipe_title,
			source: recipe_source,
			ingredients: recipe_ingredients,
			instructions: recipe_instructions,
			category: recipe_category,
			photo: recipe_photo_src
		} = req.body;
		const recipe = await Recipes.add({
			user_id,
			recipe_title,
			recipe_source,
			recipe_ingredients,
			recipe_instructions,
			recipe_category,
			recipe_photo_src
		});
		res.json({
			message: `Recipe, ${recipe.recipe_title}, was successfully added.`
		});
	} catch (err) {
		next(err);
	}
});

// update a recipe
router.put('/:id', checkRecipeId, checkRecipeBody, async (req, res, next) => {
	try {
		const {
			user_id,
			title: recipe_title,
			recipe_source,
			recipe_ingredients,
			recipe_instructions,
			recipe_category,
			recipe_photo_src
		} = req.body;
		const updatedRecipe = await Recipes.update(
			{
				user_id,
				recipe_title,
				recipe_source,
				recipe_ingredients,
				recipe_instructions,
				recipe_category,
				recipe_photo_src
			},
			req.params.id
		);
		res.json(updatedRecipe);
	} catch (err) {
		next(err);
	}
});

// delete a recipe
router.delete('/:id', checkRecipeId, async (req, res, next) => {
	try {
		const { id } = req.params;
		const recipe = await Recipes.nuke(id);
		res.json({
			message: `${recipe.recipe_title} was nuked!`
		});
	} catch (err) {
		next(err);
	}
});

module.exports = router;
