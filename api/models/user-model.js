const db = require('../data/db-config');

// gets all users
const find = () => {
	return db('users');
};

// gets user by id
const findById = id => {
	return db('users').select('user_username').where({ user_id: id }).first();
};

// gets user by filter ('username, id or password')
const findBy = filter => {
	console.log(filter);
	return db('users').select('user_id', 'user_username', 'user_password').where(filter);
};

// creates a user
async function add(user) {
	const [user_id] = await db('users').insert(user).returning('user_id');
	return findById(user_id);
}

// exports functions
module.exports = {
	find,
	findById,
	findBy,
	add
};
