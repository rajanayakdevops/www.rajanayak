const Contact = require('../models/Contact');

exports.createContact = async (req, res) => {
  try {
    const { name, email, message } = req.body;
    
    const contact = new Contact({ name, email, message });
    await contact.save();
    
    res.status(201).json({ 
      message: 'Contact saved successfully',
      contact: {
        id: contact._id,
        name: contact.name,
        email: contact.email,
        createdAt: contact.createdAt
      }
    });
  } catch (error) {
    console.error('Contact creation error:', error);
    res.status(500).json({ error: error.message });
  }
};

exports.getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};