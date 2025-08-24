const request = require('supertest');
const app = require('../src/app');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

describe('Contact API', () => {
  let contactId;
  const contactData = {
    firstName: 'John',
    lastName: 'Doe',
    email: `john.doe${Date.now()}@example.com`,
    phone: '1234567890',
  };

  afterAll(async () => {
    if (contactId) {
      await prisma.contact.deleteMany({ where: { id: contactId } });
    }
    await prisma.$disconnect();
  });

  test('Create Contact - success', async () => {
    const res = await request(app)
      .post('/contacts')
      .send(contactData);
    expect(res.statusCode).toBe(201);
    expect(res.body.contact).toHaveProperty('id');
    expect(res.body.contact.email).toBe(contactData.email);
    contactId = res.body.contact.id;
  });

  test('Get Contact - success', async () => {
    const res = await request(app)
      .get(`/contacts/${contactId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.contact).toHaveProperty('id');
    expect(res.body.contact.email).toBe(contactData.email);
  });

  test('Update Contact - success', async () => {
    const newPhone = '0987654321';
    const res = await request(app)
      .put(`/contacts/${contactId}`)
      .send({ phone: newPhone });
    expect(res.statusCode).toBe(200);
    expect(res.body.contact.phone).toBe(newPhone);
  });

  test('Delete Contact - success', async () => {
    const res = await request(app)
      .delete(`/contacts/${contactId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Contact deleted successfully');
    contactId = null;
  });

  test('List Contacts - success', async () => {
    const res = await request(app)
      .get('/contacts');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body.contacts)).toBe(true);
  });
});

