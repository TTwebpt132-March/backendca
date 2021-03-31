const server = require('../server');
const db = require('../data/db-config');
const supertest = require('supertest');

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
	it('....');
});
