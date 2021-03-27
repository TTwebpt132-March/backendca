const express = require('express');
const Recipes = require('../models/recipe-model');

const router = express.Router();

// get all the recipes
router.get('/', async (req, res, next) => {
	try {
		const recipes = await Recipes.find();
		console.log(recipes);
		res.json(recipes);
	} catch (err) {
		next(err);
	}
});

// get recipe by id
router.get('/:id', async (req, res, next) => {
	try {
		const recipe = await Recipes.findById(req.params.id);
		res.json(recipe);
	} catch (err) {
		next(err);
	}
});

// create a recipe
router.post('/', async (req, res, next) => {
	try {
		const recipe = await Recipes.add(req.body);
		res.json({
			message: `Recipe, ${recipe.recipe_title}, was successfully added.`
		});
	} catch (err) {
		next(err);
	}
});

// update a recipe
router.put('/:id', async (req, res, next) => {
	try {
		const updatedRecipe = await Recipes.update(req.body, req.params.id);
		res.json(updatedRecipe);
	} catch (err) {
		next(err);
	}
});

// delete a recipe
router.delete('/:id', async (req, res, next) => {
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
