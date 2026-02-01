const mongoose = require('mongoose');
const Project = require('../models/Project');
require('dotenv').config();

const sampleProjects = [
  {
    title: 'E-Commerce MERN Platform',
    description: 'Full-stack e-commerce application with advanced features including user authentication, payment gateway integration, real-time inventory management, and comprehensive admin dashboard. Built with modern technologies for optimal performance.',
    technologies: ['React', 'Node.js', 'MongoDB', 'Express', 'Stripe', 'JWT'],
    githubUrl: 'https://github.com/rajanayak/ecommerce-app',
    liveUrl: 'https://ecommerce-demo.netlify.app',
    imageUrl: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop'
  },
  {
    title: 'Real-Time Task Management',
    description: 'Collaborative project management platform featuring real-time updates, drag-and-drop task organization, team collaboration tools, file sharing, and progress tracking with intuitive dashboard analytics.',
    technologies: ['React', 'Node.js', 'Socket.io', 'MongoDB', 'Redux'],
    githubUrl: 'https://github.com/rajanayak/task-manager',
    liveUrl: 'https://task-manager-demo.netlify.app',
    imageUrl: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=250&fit=crop'
  },
  {
    title: 'Smart Weather Analytics',
    description: 'Advanced weather application with location-based forecasts, interactive weather maps, historical data analysis, severe weather alerts, and detailed meteorological insights using multiple weather APIs.',
    technologies: ['React', 'API Integration', 'Chart.js', 'Geolocation', 'PWA'],
    githubUrl: 'https://github.com/rajanayak/weather-app',
    liveUrl: 'https://weather-dashboard-demo.netlify.app',
    imageUrl: 'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=400&h=250&fit=crop'
  },
  {
    title: 'Dynamic Portfolio CMS',
    description: 'Personal portfolio website with content management system, featuring dynamic project showcase, blog functionality, contact management, visitor analytics, and responsive design optimized for all devices.',
    technologies: ['React', 'Node.js', 'MongoDB', 'Express', 'CMS'],
    githubUrl: 'https://github.com/rajanayak/portfolio',
    liveUrl: 'https://rajanayak-portfolio.netlify.app',
    imageUrl: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=400&h=250&fit=crop'
  },
  {
    title: 'Social Media Dashboard',
    description: 'Comprehensive social media management platform with post scheduling, analytics tracking, multi-platform integration, engagement metrics, and automated content optimization for better reach.',
    technologies: ['React', 'Node.js', 'API Integration', 'Analytics', 'Automation'],
    githubUrl: 'https://github.com/rajanayak/social-dashboard',
    liveUrl: 'https://social-dashboard-demo.netlify.app',
    imageUrl: 'https://images.unsplash.com/photo-1611262588024-d12430b98920?w=400&h=250&fit=crop'
  },
  {
    title: 'Learning Management System',
    description: 'Educational platform with course management, video streaming, progress tracking, quiz system, certificate generation, and interactive learning modules designed for modern online education.',
    technologies: ['React', 'Node.js', 'Video Streaming', 'MongoDB', 'PDF Generation'],
    githubUrl: 'https://github.com/rajanayak/lms-platform',
    liveUrl: 'https://lms-demo.netlify.app',
    imageUrl: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=400&h=250&fit=crop'
  }
];

const seedProjects = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');
    
    await Project.deleteMany({});
    console.log('Cleared existing projects');
    
    const projects = await Project.insertMany(sampleProjects);
    console.log(`Added ${projects.length} sample projects`);
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding projects:', error);
    process.exit(1);
  }
};

seedProjects();