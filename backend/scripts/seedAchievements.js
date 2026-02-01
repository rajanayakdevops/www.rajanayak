const mongoose = require('mongoose');
const Achievement = require('../models/Achievement');
require('dotenv').config();

const sampleAchievements = [
  {
    title: "Smart City Hackathon Winner",
    event: "TechFest 2024",
    position: "1st Place",
    date: "March 2024",
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=250&fit=crop",
    description: "Built an IoT-based traffic management system that reduces congestion by 40% using real-time data analytics.",
    details: "Developed a comprehensive smart city solution integrating IoT sensors, machine learning algorithms, and real-time dashboard. The system monitors traffic patterns, predicts congestion, and automatically adjusts traffic signals.",
    technologies: ["React", "Node.js", "IoT", "Python", "MongoDB"]
  },
  {
    title: "AI Innovation Challenge",
    event: "CodeStorm 2023",
    position: "2nd Place",
    date: "November 2023",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=250&fit=crop",
    description: "Created an AI-powered chatbot for customer service that improved response time by 60%.",
    details: "Designed and implemented an intelligent chatbot using natural language processing and machine learning. The solution handles complex customer queries, learns from interactions, and provides personalized responses.",
    technologies: ["Python", "TensorFlow", "NLP", "Flask", "PostgreSQL"]
  }
];

const seedAchievements = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');
    
    await Achievement.deleteMany({});
    console.log('Cleared existing achievements');
    
    const achievements = await Achievement.insertMany(sampleAchievements);
    console.log(`Added ${achievements.length} sample achievements`);
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding achievements:', error);
    process.exit(1);
  }
};

seedAchievements();