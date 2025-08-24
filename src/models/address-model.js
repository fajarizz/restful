const { prismaClient } = require('../config/prisma-client');

class AddressModel {
  static async create(data) {
    return prismaClient.address.create({ data });
  }

  static async getById(id) {
    return prismaClient.address.findUnique({ where: { id } });
  }

  static async update(id, data) {
    return prismaClient.address.update({ where: { id }, data });
  }

  static async delete(id) {
    return prismaClient.address.delete({ where: { id } });
  }

  static async list() {
    return prismaClient.address.findMany();
  }
}

module.exports = AddressModel;
