const bcrypt = require('bcrypt');
const { prismaClient } = require('../config/prisma-client');

class UserModel {
  // Register a new user
  static async register({ username, password, name, addressId }) {
    const hashedPassword = await bcrypt.hash(password, 10);
    return prismaClient.user.create({
      data: { username, password: hashedPassword, name, addressId }
    });
  }

  // Login user (returns user if credentials are valid)
  static async login({ username, password }) {
    const user = await prismaClient.user.findUnique({ where: { username } });
    if (!user) return null;
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return null;
    return user;
  }

  // Update user info
  static async update(id, data) {
    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }
    return prismaClient.user.update({
      where: { id },
      data
    });
  }

  // Get user by id
  static async getById(id) {
    return prismaClient.user.findUnique({ where: { id } });
  }

  // Logout (placeholder, actual logic handled in controller/session)
  static async logout() {
    // Implement session/token invalidation in controller/middleware
    return true;
  }
}

module.exports = UserModel;
