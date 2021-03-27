exports.seed = async function (knex) {
	await knex('users').insert([
		{
			user_username: 'lambda',
			user_password: '$2a$14$LDzu3p03H.A9stTqhqX1oeN3C70AjbDJLMZC1d/FQaNWlSPREiWw.',
			user_email: 'lambda@cooks.com'
		}
	]);
};
