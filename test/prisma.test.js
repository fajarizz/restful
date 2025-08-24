const { prismaClient } = require('../src/config/prisma-client');

describe('Prisma User Model', () => {
  let testUser;

  afterAll(async () => {
    await prismaClient.$disconnect();
  });

  afterEach(async () => {
    // Clean up test user if exists
    if (testUser && testUser.id) {
      await prismaClient.user.deleteMany({ where: { id: testUser.id } });
      testUser = null;
    }
  });

  test('should create a user', async () => {
    testUser = await prismaClient.user.create({
      data: {
        username: 'testuser',
        password: 'testpass',
        name: 'Test User',
      },
    });
    expect(testUser).toHaveProperty('id');
    expect(testUser.username).toBe('testuser');
  });

  test('should read a user', async () => {
    testUser = await prismaClient.user.create({
      data: {
        username: 'readuser',
        password: 'readpass',
        name: 'Read User',
      },
    });
    const found = await prismaClient.user.findUnique({ where: { id: testUser.id } });
    expect(found).not.toBeNull();
    expect(found.username).toBe('readuser');
  });

  test('should update a user', async () => {
    testUser = await prismaClient.user.create({
      data: {
        username: 'updateuser',
        password: 'updatepass',
        name: 'Update User',
      },
    });
    const updated = await prismaClient.user.update({
      where: { id: testUser.id },
      data: { name: 'Updated Name' },
    });
    expect(updated.name).toBe('Updated Name');
  });

  test('should delete a user', async () => {
    testUser = await prismaClient.user.create({
      data: {
        username: 'deleteuser',
        password: 'deletepass',
        name: 'Delete User',
      },
    });
    const deleted = await prismaClient.user.delete({ where: { id: testUser.id } });
    expect(deleted.id).toBe(testUser.id);
    const found = await prismaClient.user.findUnique({ where: { id: testUser.id } });
    expect(found).toBeNull();
    testUser = null;
  });
});

describe('Prisma Address Model', () => {
  let testAddress;

  afterAll(async () => {
    if (testAddress && testAddress.id) {
      await prismaClient.address.deleteMany({ where: { id: testAddress.id } });
    }
    await prismaClient.$disconnect();
  });

  test('should create an address', async () => {
    testAddress = await prismaClient.address.create({
      data: {
        street: 'Test St',
        city: 'Test City',
        province: 'Test Province',
        postalCode: '00000',
      },
    });
    expect(testAddress).toHaveProperty('id');
    expect(testAddress.street).toBe('Test St');
  });

  test('should read an address', async () => {
    const found = await prismaClient.address.findUnique({ where: { id: testAddress.id } });
    expect(found).not.toBeNull();
    expect(found.street).toBe('Test St');
  });

  test('should update an address', async () => {
    const updated = await prismaClient.address.update({
      where: { id: testAddress.id },
      data: { street: 'Updated St' },
    });
    expect(updated.street).toBe('Updated St');
  });

  test('should delete an address', async () => {
    const deleted = await prismaClient.address.delete({ where: { id: testAddress.id } });
    expect(deleted.id).toBe(testAddress.id);
    const found = await prismaClient.address.findUnique({ where: { id: testAddress.id } });
    expect(found).toBeNull();
    testAddress = null;
  });
});

describe('Prisma Contact Model', () => {
  let testContact;
  const email = `test${Date.now()}@example.com`;

  afterAll(async () => {
    if (testContact && testContact.id) {
      await prismaClient.contact.deleteMany({ where: { id: testContact.id } });
    }
    await prismaClient.$disconnect();
  });

  test('should create a contact', async () => {
    testContact = await prismaClient.contact.create({
      data: {
        firstName: 'Jane',
        lastName: 'Doe',
        email,
        phone: '1234567890',
      },
    });
    expect(testContact).toHaveProperty('id');
    expect(testContact.email).toBe(email);
  });

  test('should read a contact', async () => {
    const found = await prismaClient.contact.findUnique({ where: { id: testContact.id } });
    expect(found).not.toBeNull();
    expect(found.email).toBe(email);
  });

  test('should update a contact', async () => {
    const updated = await prismaClient.contact.update({
      where: { id: testContact.id },
      data: { phone: '0987654321' },
    });
    expect(updated.phone).toBe('0987654321');
  });

  test('should delete a contact', async () => {
    const deleted = await prismaClient.contact.delete({ where: { id: testContact.id } });
    expect(deleted.id).toBe(testContact.id);
    const found = await prismaClient.contact.findUnique({ where: { id: testContact.id } });
    expect(found).toBeNull();
    testContact = null;
  });
});
