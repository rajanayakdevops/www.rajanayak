const Testimonial = require('../models/Testimonial');

const sampleTestimonials = [
  {
    name: 'Sarah Johnson',
    position: 'Product Manager',
    company: 'TechCorp Inc.',
    message: 'Raja delivered an exceptional e-commerce platform that exceeded our expectations. His attention to detail and technical expertise made the entire process smooth.',
    rating: 5
  },
  {
    name: 'Michael Chen',
    position: 'CTO',
    company: 'StartupXYZ',
    message: 'Working with Raja was a game-changer for our startup. He built a scalable MERN stack application that handles our growing user base perfectly.',
    rating: 5
  },
  {
    name: 'Emily Rodriguez',
    position: 'Founder',
    company: 'Digital Solutions',
    message: 'Raja\'s problem-solving skills are outstanding. He optimized our algorithms and improved performance by 300%. Highly recommended!',
    rating: 5
  },
  {
    name: 'David Kumar',
    position: 'Lead Developer',
    company: 'InnovateTech',
    message: 'Raja is a talented developer with strong DSA skills. His code is clean, efficient, and well-documented. Great to work with!',
    rating: 5
  }
];

exports.getTestimonials = async (req, res) => {
  try {
    let testimonials = await Testimonial.find().sort({ createdAt: -1 });
    
    if (testimonials.length === 0) {
      await Testimonial.insertMany(sampleTestimonials);
      testimonials = await Testimonial.find().sort({ createdAt: -1 });
    }
    
    res.json(testimonials);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createTestimonial = async (req, res) => {
  try {
    const testimonial = new Testimonial(req.body);
    await testimonial.save();
    res.status(201).json(testimonial);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};