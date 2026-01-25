import React, { useState, useEffect } from 'react';
import { projectAPI } from '../services/api';
import SkeletonLoader from '../components/SkeletonLoader';
import './Projects.css';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');
  const [fadeIn, setFadeIn] = useState(false);

  const filters = ['All', 'React', 'Node.js', 'Full Stack', 'Frontend'];

  const sampleProjects = [
    {
      _id: '1',
      title: 'E-Commerce MERN Platform',
      description: 'Full-stack e-commerce application with advanced features including user authentication, payment gateway integration, real-time inventory management, and comprehensive admin dashboard. Built with modern technologies for optimal performance.',
      technologies: ['React', 'Node.js', 'MongoDB', 'Express', 'Stripe', 'JWT'],
      githubUrl: 'https://github.com/rajanayak/ecommerce-app',
      liveUrl: 'https://ecommerce-demo.netlify.app'
    },
    {
      _id: '2',
      title: 'Real-Time Task Management',
      description: 'Collaborative project management platform featuring real-time updates, drag-and-drop task organization, team collaboration tools, file sharing, and progress tracking with intuitive dashboard analytics.',
      technologies: ['React', 'Node.js', 'Socket.io', 'MongoDB', 'Redux'],
      githubUrl: 'https://github.com/rajanayak/task-manager',
      liveUrl: 'https://task-manager-demo.netlify.app'
    },
    {
      _id: '3',
      title: 'Smart Weather Analytics',
      description: 'Advanced weather application with location-based forecasts, interactive weather maps, historical data analysis, severe weather alerts, and detailed meteorological insights using multiple weather APIs.',
      technologies: ['React', 'API Integration', 'Chart.js', 'Geolocation', 'PWA'],
      githubUrl: 'https://github.com/rajanayak/weather-app',
      liveUrl: 'https://weather-dashboard-demo.netlify.app'
    },
    {
      _id: '4',
      title: 'Dynamic Portfolio CMS',
      description: 'Personal portfolio website with content management system, featuring dynamic project showcase, blog functionality, contact management, visitor analytics, and responsive design optimized for all devices.',
      technologies: ['React', 'Node.js', 'MongoDB', 'Express', 'CMS'],
      githubUrl: 'https://github.com/rajanayak/portfolio',
      liveUrl: 'https://rajanayak-portfolio.netlify.app'
    },
    {
      _id: '5',
      title: 'Social Media Dashboard',
      description: 'Comprehensive social media management platform with post scheduling, analytics tracking, multi-platform integration, engagement metrics, and automated content optimization for better reach.',
      technologies: ['React', 'Node.js', 'API Integration', 'Analytics', 'Automation'],
      githubUrl: 'https://github.com/rajanayak/social-dashboard',
      liveUrl: 'https://social-dashboard-demo.netlify.app'
    },
    {
      _id: '6',
      title: 'Learning Management System',
      description: 'Educational platform with course management, video streaming, progress tracking, quiz system, certificate generation, and interactive learning modules designed for modern online education.',
      technologies: ['React', 'Node.js', 'Video Streaming', 'MongoDB', 'PDF Generation'],
      githubUrl: 'https://github.com/rajanayak/lms-platform',
      liveUrl: 'https://lms-demo.netlify.app'
    }
  ];

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      // Show skeleton for 1 second minimum
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const response = await projectAPI.getProjects();
      if (response.data.length > 0) {
        setProjects(response.data);
      } else {
        setProjects(sampleProjects);
      }
    } catch (error) {
      console.error('Error fetching projects:', error);
      setProjects(sampleProjects);
    } finally {
      setLoading(false);
      // Trigger fade-in animation
      setTimeout(() => setFadeIn(true), 100);
    }
  };

  const filteredProjects = projects.filter(project => 
    filter === 'All' || project.technologies.some(tech => 
      tech.toLowerCase().includes(filter.toLowerCase())
    )
  );

  if (loading) {
    return <SkeletonLoader type="projects" count={6} />;
  }

  return (
    <div className={`projects-page ${fadeIn ? 'fade-in-active' : ''}`}>
      <div className="container">
        <div className="projects-header fade-item" style={{animationDelay: '0.1s'}}>
          <h1>Featured Projects</h1>
          <p className="subtitle">
            Discover my latest work showcasing innovative solutions and cutting-edge technologies. 
            Each project represents a unique challenge solved with creativity and technical expertise.
          </p>
          
          <div className="project-filters">
            {filters.map(filterName => (
              <button
                key={filterName}
                className={`filter-btn ${filter === filterName ? 'active' : ''}`}
                onClick={() => setFilter(filterName)}
              >
                {filterName}
              </button>
            ))}
          </div>
        </div>
        
        <div className="projects-grid">
          {filteredProjects.map((project, index) => (
            <div 
              key={project._id} 
              className="project-card fade-item"
              style={{animationDelay: `${0.2 + (index * 0.1)}s`}}
            >
              <div className="project-status">
                <span className="status-dot"></span>
                Live
              </div>
              <div className="project-image">
                <div className="project-icon">🚀</div>
                <div className="project-overlay">
                  <div className="overlay-content">
                    <h4>View Project</h4>
                    <p>Click to explore</p>
                  </div>
                </div>
              </div>
              <div className="project-content">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="technologies">
                  {project.technologies.map((tech, techIndex) => (
                    <span key={techIndex} className="tech-tag">{tech}</span>
                  ))}
                </div>
                <div className="project-links">
                  {project.githubUrl && (
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                      <span>📂</span> View Code
                    </a>
                  )}
                  {project.liveUrl && (
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                      <span>🌐</span> Live Demo
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;