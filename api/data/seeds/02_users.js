exports.seed = async function (knex) {
	await knex('users').insert([
		{ user_username: 'lambda', user_password: 'lambda123', user_email: 'lambda@cook.com' }
	]);
};
