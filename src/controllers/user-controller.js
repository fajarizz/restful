const UserModel = require('../models/user-model');

// Register User
exports.registerUser = async (req, res) => {
  try {
    const { username, password, name, addressId } = req.body;
    const user = await UserModel.register({ username, password, name, addressId });
    res.status(201).json({ message: 'User registered successfully', user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Login User
exports.loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await UserModel.login({ username, password });
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });
    // Set session or token here if needed
    res.json({ message: 'Login successful', user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update User
exports.updateUser = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const data = req.body;
    const user = await UserModel.update(id, data);
    res.json({ message: 'User updated successfully', user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get User
exports.getUser = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const user = await UserModel.getById(id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json({ user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Logout User
exports.logoutUser = async (req, res) => {
  try {
    await UserModel.logout();
    // Destroy session or remove token here if needed
    res.json({ message: 'Logout successful' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
