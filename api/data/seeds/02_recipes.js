exports.seed = async function (knex) {
	await knex('recipes').insert([
		{
			recipe_title: 'Chicken Alfredo',
			recipe_source: 'Google',
			recipe_ingredients: [
				'Kosher Salt',
				'Ground Black Pepper',
				'Fettuccine',
				'Olive Oil',
				'Boneless, Skinless Chicken Breats',
				'Unsalted Butter',
				'Heavy Cream',
				'Freshly Grated Nutmeg',
				'Freshly Grated Parmigiano-Reggiano'
			],
			recipe_category: ['pasta', 'dinner', 'alfredo', 'Chicken Alfredo'],
			recipe_photo_src: 'a link goes here.',
			user_id: 1
		}
	]);
};
