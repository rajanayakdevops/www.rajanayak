const Project = require('../models/Project');

exports.seedProjects = async (req, res) => {
  try {
    const sampleProjects = [
      {
        title: "E-Commerce MERN App",
        description: "Full-stack e-commerce application with user authentication, payment integration, and admin dashboard. Built with React, Node.js, MongoDB, and Stripe API.",
        technologies: ["React", "Node.js", "MongoDB", "Express", "Stripe", "JWT"],
        githubUrl: "https://github.com/rajanayak/ecommerce-app",
        liveUrl: "https://ecommerce-demo.netlify.app",
        imageUrl: "https://via.placeholder.com/400x200"
      },
      {
        title: "DSA Visualizer",
        description: "Interactive web application to visualize sorting algorithms and data structures. Helps students understand complex algorithms through animations.",
        technologies: ["React", "JavaScript", "CSS3", "Algorithms"],
        githubUrl: "https://github.com/rajanayak/dsa-visualizer",
        liveUrl: "https://dsa-visualizer-demo.netlify.app",
        imageUrl: "https://via.placeholder.com/400x200"
      },
      {
        title: "Task Management System",
        description: "Collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.",
        technologies: ["React", "Node.js", "Socket.io", "MongoDB", "Express"],
        githubUrl: "https://github.com/rajanayak/task-manager",
        liveUrl: "https://task-manager-demo.netlify.app",
        imageUrl: "https://via.placeholder.com/400x200"
      },
      {
        title: "Weather Dashboard",
        description: "Modern weather application with location-based forecasts, interactive maps, and detailed weather analytics using OpenWeather API.",
        technologies: ["React", "API Integration", "Chart.js", "CSS3"],
        githubUrl: "https://github.com/rajanayak/weather-app",
        liveUrl: "https://weather-dashboard-demo.netlify.app",
        imageUrl: "https://via.placeholder.com/400x200"
      }
    ];

    await Project.deleteMany({});
    await Project.insertMany(sampleProjects);
    
    res.json({ message: 'Sample projects created successfully', count: sampleProjects.length });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};