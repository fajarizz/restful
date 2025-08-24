const AddressModel = require('../models/address-model');

exports.createAddress = async (req, res) => {
  try {
    const address = await AddressModel.create(req.body);
    res.status(201).json({ address });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAddress = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const address = await AddressModel.getById(id);
    if (!address) return res.status(404).json({ error: 'Address not found' });
    res.json({ address });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateAddress = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const address = await AddressModel.update(id, req.body);
    res.json({ address });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteAddress = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    await AddressModel.delete(id);
    res.json({ message: 'Address deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.listAddresses = async (req, res) => {
  try {
    const addresses = await AddressModel.list();
    res.json({ addresses });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

