const ContactModel = require('../models/contact-model');

exports.createContact = async (req, res) => {
  try {
    const contact = await ContactModel.create(req.body);
    res.status(201).json({ contact });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getContact = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const contact = await ContactModel.getById(id);
    if (!contact) return res.status(404).json({ error: 'Contact not found' });
    res.json({ contact });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateContact = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const contact = await ContactModel.update(id, req.body);
    res.json({ contact });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteContact = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    await ContactModel.delete(id);
    res.json({ message: 'Contact deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.listContacts = async (req, res) => {
  try {
    const contacts = await ContactModel.list();
    res.json({ contacts });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

