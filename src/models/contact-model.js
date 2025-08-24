const { prismaClient } = require('../config/prisma-client');

class ContactModel {
  static async create(data) {
    return prismaClient.contact.create({ data });
  }

  static async getById(id) {
    return prismaClient.contact.findUnique({ where: { id } });
  }

  static async update(id, data) {
    return prismaClient.contact.update({ where: { id }, data });
  }

  static async delete(id) {
    return prismaClient.contact.delete({ where: { id } });
  }

  static async list() {
    return prismaClient.contact.findMany();
  }
}

module.exports = ContactModel;
