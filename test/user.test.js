const request = require('supertest');
const app = require('../src/app');
const { prismaClient } = require('../src/config/prisma-client');

describe('User API', () => {
  let userId;
  let username = `testuser_${Date.now()}`;
  let password = 'TestPass123!';
  let name = 'Test User';

  afterAll(async () => {
    // Clean up test user
    if (userId) {
      await prismaClient.user.deleteMany({ where: { id: userId } });
    }
    await prismaClient.$disconnect();
  });

  test('Register User - success', async () => {
    const res = await request(app)
      .post('/users/register')
      .send({ username, password, name });
    expect(res.statusCode).toBe(201);
    expect(res.body.user).toHaveProperty('id');
    expect(res.body.user.username).toBe(username);
    userId = res.body.user.id;
  });

  test('Register User - fail (duplicate username)', async () => {
    const res = await request(app)
      .post('/users/register')
      .send({ username, password, name });
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('error');
  });

  test('Login User - success', async () => {
    const res = await request(app)
      .post('/users/login')
      .send({ username, password });
    expect(res.statusCode).toBe(200);
    expect(res.body.user).toHaveProperty('id');
    expect(res.body.user.username).toBe(username);
  });

  test('Login User - fail (wrong password)', async () => {
    const res = await request(app)
      .post('/users/login')
      .send({ username, password: 'WrongPass' });
    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty('error');
  });

  test('Get User - success', async () => {
    const res = await request(app)
      .get(`/users/${userId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.user).toHaveProperty('id');
    expect(res.body.user.username).toBe(username);
  });

  test('Get User - fail (not found)', async () => {
    const res = await request(app)
      .get('/users/99999999');
    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty('error');
  });

  test('Update User - success', async () => {
    const newName = 'Updated Name';
    const res = await request(app)
      .put(`/users/${userId}`)
      .send({ name: newName });
    expect(res.statusCode).toBe(200);
    expect(res.body.user.name).toBe(newName);
  });

  test('Update User - fail (invalid id)', async () => {
    const res = await request(app)
      .put('/users/99999999')
      .send({ name: 'No User' });
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('error');
  });

  test('Logout User - success', async () => {
    const res = await request(app)
      .post('/users/logout');
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Logout successful');
  });
});
