exports.up = async function (knex) {
	await knex.schema.createTable('recipes', table => {
		table.increments('recipe_id');
		table.text('recipe_title').notNull();
		table.text('recipe_source');
		table.text('recipe_ingredients').notNull();
		table.text('recipe_category').notNull();
		table.text('recipe_photo_src');
		table.integer('user_id').references('user_id');
	});
};

exports.down = async function (knex) {
	await knex.schema.dropTableIfExists('recipes');
};
