const Contact = require('../models/Contact');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

exports.createContact = async (req, res) => {
  try {
    const { name, email, message } = req.body;
    
    // Save to database first
    const contact = new Contact({ name, email, message });
    await contact.save();
    console.log('Contact saved to database:', contact);

    // Try to send email notification (don't fail if this fails)
    try {
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER,
        subject: 'New Portfolio Contact',
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
      };

      await transporter.sendMail(mailOptions);
      console.log('Email notification sent successfully');
    } catch (emailError) {
      console.log('Email sending failed (but contact saved):', emailError.message);
      // Don't throw error - contact is already saved
    }
    
    // Always return success if contact is saved
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