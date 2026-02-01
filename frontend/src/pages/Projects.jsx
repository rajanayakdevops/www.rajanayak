import React, { useState, useEffect } from 'react';
import projectAPI from '../services/projectAPI';
import SkeletonLoader from '../components/SkeletonLoader';
import { useAuth } from '../contexts/AuthContext.jsx';
import './Projects.css';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');
  const [fadeIn, setFadeIn] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState('');
  const { isAuthenticated } = useAuth();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    technologies: '',
    githubUrl: '',
    liveUrl: '',
    imageUrl: ''
  });

  const filters = ['All', 'React', 'Node.js', 'Full Stack', 'Frontend'];

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      setLoading(true);
      const response = await projectAPI.getAll();
      setProjects(response.data);
    } catch (error) {
      console.error('Failed to load projects:', error);
      setError('Failed to load projects');
    } finally {
      setLoading(false);
      setTimeout(() => setFadeIn(true), 100);
    }
  };

  const openAddForm = () => {
    setShowAddForm(true);
  };

  const closeAddForm = () => {
    setShowAddForm(false);
    setFormData({
      title: '',
      description: '',
      technologies: '',
      githubUrl: '',
      liveUrl: '',
      imageUrl: ''
    });
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    
    try {
      const projectData = {
        ...formData,
        technologies: formData.technologies.split(',').map(tech => tech.trim())
      };
      
      await projectAPI.create(projectData);
      setSuccessMessage('Project added successfully!');
      await loadProjects();
      closeAddForm();
      
      setTimeout(() => setSuccessMessage(''), 3000);
      
    } catch (error) {
      console.error('Failed to create project:', error);
      setError('Failed to add project. Please try again.');
    } finally {
      setSaving(false);
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
          <div className="header-content">
            <h1>Featured Projects</h1>
            <p className="subtitle">
              Discover my latest work showcasing innovative solutions and cutting-edge technologies. 
              Each project represents a unique challenge solved with creativity and technical expertise.
            </p>
          </div>
          {isAuthenticated && (
            <button className="add-btn" onClick={openAddForm}>
              <span className="plus-icon">+</span>
              Add Project
            </button>
          )}
        </div>
        
        {successMessage && (
          <div className="success-message">
            {successMessage}
            <button onClick={() => setSuccessMessage('')}>×</button>
          </div>
        )}
        
        {error && (
          <div className="error-message">
            {error}
            <button onClick={() => setError('')}>×</button>
          </div>
        )}
        
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
                {project.imageUrl ? (
                  <img src={project.imageUrl} alt={project.title} />
                ) : (
                  <div className="project-icon">🚀</div>
                )}
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

        {projects.length === 0 && !loading && (
          <div className="empty-state">
            <h3>No projects yet</h3>
            <p>Click "Add Project" to create your first project card</p>
          </div>
        )}
      </div>

      {/* Add Project Form Modal */}
      {showAddForm && (
        <div className="modal-overlay" onClick={closeAddForm}>
          <div className="modal-content form-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeAddForm}>×</button>
            <div className="form-header">
              <h2>Add New Project</h2>
              <p>Fill in the details of your new project</p>
            </div>
            <form onSubmit={handleSubmit} className="project-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Title</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    placeholder="e.g., E-Commerce Platform"
                  />
                </div>
                <div className="form-group">
                  <label>Image URL</label>
                  <input
                    type="url"
                    name="imageUrl"
                    value={formData.imageUrl}
                    onChange={handleInputChange}
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  rows="4"
                  placeholder="Detailed description of your project"
                ></textarea>
              </div>
              <div className="form-group">
                <label>Technologies (comma-separated)</label>
                <input
                  type="text"
                  name="technologies"
                  value={formData.technologies}
                  onChange={handleInputChange}
                  required
                  placeholder="React, Node.js, MongoDB, Express"
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>GitHub URL</label>
                  <input
                    type="url"
                    name="githubUrl"
                    value={formData.githubUrl}
                    onChange={handleInputChange}
                    required
                    placeholder="https://github.com/username/repo"
                  />
                </div>
                <div className="form-group">
                  <label>Live URL</label>
                  <input
                    type="url"
                    name="liveUrl"
                    value={formData.liveUrl}
                    onChange={handleInputChange}
                    required
                    placeholder="https://project-demo.netlify.app"
                  />
                </div>
              </div>
              <div className="form-actions">
                <button type="button" className="btn-cancel" onClick={closeAddForm} disabled={saving}>
                  Cancel
                </button>
                <button type="submit" className="btn-save" disabled={saving}>
                  {saving ? (
                    <>
                      <span className="saving-spinner"></span>
                      Saving...
                    </>
                  ) : (
                    'Add Project'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Projects;