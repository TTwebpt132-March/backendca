const server = require('../server');
const db = require('../data/db-config');
const supertest = require('supertest');
const jwt = require('jsonwebtoken');

beforeAll(async () => {
	await db.migrate.rollback();
	await db.migrate.latest();
});
beforeEach(async () => {
	await db.seed.run();
});
afterAll(async done => {
	await db.destroy();
	done();
});

it('sanity check', () => {
	expect(true).not.toBe(false);
});

describe('server.js', () => {
	it('is the correct testing environment', async () => {
		expect(process.env.NODE_ENV).toBe('testing');
	});
});

describe('auth-router.js', () => {
	it('tests register endpoint', async () => {
		const res = await supertest(server).post('/api/auth/register').send({
			username: 'carlos',
			password: 'los123',
			email: 'los@cooks.com'
		});

		expect(res.statusCode).toBe(201);
		expect(res.type).toBe('application/json');
		expect(res.body.user_username).toBe('carlos');
	});

	it('tests middleware - username is taken', async () => {
		const res = await supertest(server).post('/api/auth/register').send({
			username: 'lambda',
			password: 'lambda123',
			email: 'lambda@cooks.com'
		});
		expect(res.statusCode).toBe(409);
		expect(res.type).toBe('application/json');
		expect(res.body.message).toBe('Username is taken.');
	});

	it('Checks login works and token is sent', async () => {
		const res = await supertest(server).post('/api/auth/login').send({
			username: 'lambda',
			password: 'lambda123'
		});

		expect(res.statusCode).toBe(200);
		expect(res.type).toBe('application/json');
		expect('res.body.token').toBeDefined();
	});

	it('checks middleware - invalid crenditials', async () => {
		const res = await supertest(server).post('/api/auth/login').send({
			username: 'something',
			password: 'something else'
		});

		expect(res.statusCode).toBe(401);
		expect(res.body.message).toBe('Invalid Credentials.');
	});
});

describe('user-router.js', () => {
	it('gets all users', async () => {
		const {
			body: { token }
		} = await supertest(server).post('/api/auth/login').send({
			username: 'lambda',
			password: 'lambda123'
		});

		const res = await supertest(server).get('/api/users').set('authorization', token);
		expect(res.statusCode).toBe(200);
		expect(res.type).toBe('application/json');
		expect(res.body[0].user_id).toBe(1);
	});

	it('get user by id', async () => {
		const {
			body: { token }
		} = await supertest(server).post('/api/auth/login').send({
			username: 'lambda',
			password: 'lambda123'
		});

		let user;
		jwt.verify(token, process.env.SECRET, (err, decoded) => {
			user = decoded;
		});

		const res = await supertest(server).get(`/api/users/${user.userID}`).set('authorization', token);
		expect(res.statusCode).toBe(200);
		expect(res.type).toBe('application/json');
		expect(res.body.user_id).toBe(1);
	});

	it('updates user', async () => {
		const {
			body: { token }
		} = await supertest(server).post('/api/auth/login').send({
			username: 'lambda',
			password: 'lambda123'
		});

		let user;
		jwt.verify(token, process.env.SECRET, (err, decoded) => {
			user = decoded;
		});

		const res = await supertest(server)
			.put(`/api/users/${user.userID}`)
			.send({
				username: 'Carlos',
				password: 'lambda123',
				emai: 'los@cooks.com'
			})
			.set('authorization', token);
		expect(res.statusCode).toBe(200);
		expect(res.body.user_username).toBe('Carlos');
	});

	it('deletes user', async () => {
		const {
			body: { token }
		} = await supertest(server).post('/api/auth/login').send({
			username: 'lambda',
			password: 'lambda123'
		});

		let user;
		jwt.verify(token, process.env.SECRET, (err, decoded) => {
			user = decoded;
		});

		const res = await supertest(server).delete(`/api/users/${user.userID}`).set('authorization', token);
		expect(res.statusCode).toBe(200);
		expect(res.body.message).toBeDefined();
	});

	it('gets users recipes', async () => {
		const {
			body: { token }
		} = await supertest(server).post('/api/auth/login').send({
			username: 'lambda',
			password: 'lambda123'
		});

		let user;
		jwt.verify(token, process.env.SECRET, (err, decoded) => {
			user = decoded;
		});

		const res = await supertest(server).get(`/api/users/${user.userID}/recipes`).set('authorization', token);
		expect(res.statusCode).toBe(200);
		expect(res.body.recipes).toBeDefined();
	});
});

describe('recipe-router.js', () => {
	it('gets all recipes', async () => {
		const {
			body: { token }
		} = await supertest(server).post('/api/auth/login').send({
			username: 'lambda',
			password: 'lambda123'
		});

		const res = await supertest(server).get('/api/recipes').set('authorization', token);
		expect(res.statusCode).toBe(200);
		expect(res.type).toBe('application/json');
		expect(res.body[0].id).toBe(1);
	});

	it('gets recipe by id', async () => {
		const {
			body: { token }
		} = await supertest(server).post('/api/auth/login').send({
			username: 'lambda',
			password: 'lambda123'
		});

		const res = await supertest(server).get(`/api/recipes/${2}`).set('authorization', token);
		expect(res.statusCode).toBe(200);
		expect(res.type).toBe('application/json');
		expect(res.body.recipe_id).toBe(2);
	});

	it('creates a recipe', async () => {
		const {
			body: { token }
		} = await supertest(server).post('/api/auth/login').send({
			username: 'lambda',
			password: 'lambda123'
		});

		const res = await supertest(server)
			.post('/api/recipes')
			.send({
				title: 'testing',
				source: 'me',
				ingredients: ['salt', 'pepper'],
				instructions: 'something',
				category: ['dinner'],
				photo: ''
			})
			.set('authorization', token);

		expect(res.statusCode).toBe(201);
		expect(res.body.message).toBeDefined();
	});

	it('updates a recipe', async () => {
		const {
			body: { token }
		} = await supertest(server).post('/api/auth/login').send({
			username: 'lambda',
			password: 'lambda123'
		});

		const res = await supertest(server)
			.put(`/api/recipes/${1}`)
			.send({
				title: 'testing',
				source: 'me',
				ingredients: ['salt', 'pepper'],
				instructions: 'something',
				category: ['dinner'],
				photo: ''
			})
			.set('authorization', token);

		expect(res.statusCode).toBe(200);
		expect(res.body.recipe_title).toBe('testing');
	});

	it('deletes a recipe', async () => {
		const {
			body: { token }
		} = await supertest(server).post('/api/auth/login').send({
			username: 'lambda',
			password: 'lambda123'
		});

		const res = await supertest(server).delete(`/api/recipes/${1}`).set('authorization', token);
		expect(res.statusCode).toBe(200);
		expect(res.body.message).toBeDefined();
	});
});
