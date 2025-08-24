const request = require('supertest');
const app = require('../src/app');
const { prismaClient } = require('../src/config/prisma-client');

describe('Address API', () => {
  let addressId;
  const addressData = {
    street: '123 Main St',
    city: 'Testville',
    province: 'TestState',
    postalCode: '12345',
  };

  afterAll(async () => {
    if (addressId) {
      await prismaClient.address.deleteMany({ where: { id: addressId } });
    }
    await prismaClient.$disconnect();
  });

  test('Create Address - success', async () => {
    const res = await request(app)
      .post('/addresses')
      .send(addressData);
    expect(res.statusCode).toBe(201);
    expect(res.body.address).toHaveProperty('id');
    expect(res.body.address.street).toBe(addressData.street);
    addressId = res.body.address.id;
  });

  test('Get Address - success', async () => {
    const res = await request(app)
      .get(`/addresses/${addressId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.address).toHaveProperty('id');
    expect(res.body.address.street).toBe(addressData.street);
  });

  test('Update Address - success', async () => {
    const newStreet = '456 Updated St';
    const res = await request(app)
      .put(`/addresses/${addressId}`)
      .send({ street: newStreet });
    expect(res.statusCode).toBe(200);
    expect(res.body.address.street).toBe(newStreet);
  });

  test('Delete Address - success', async () => {
    const res = await request(app)
      .delete(`/addresses/${addressId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Address deleted successfully');
    addressId = null;
  });

  test('List Addresses - success', async () => {
    const res = await request(app)
      .get('/addresses');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body.addresses)).toBe(true);
  });
});
