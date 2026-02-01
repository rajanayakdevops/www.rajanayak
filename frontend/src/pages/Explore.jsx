import React, { useState, useEffect } from 'react';
import achievementAPI from '../services/achievementAPI';
import './Explore.css';

const Explore = () => {
  const [selectedAchievement, setSelectedAchievement] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    event: '',
    position: '',
    date: '',
    image: '',
    description: '',
    details: '',
    technologies: ''
  });

  // Load achievements from database
  useEffect(() => {
    loadAchievements();
  }, []);

  const loadAchievements = async () => {
    try {
      setLoading(true);
      const response = await achievementAPI.getAll();
      setAchievements(response.data);
    } catch (error) {
      console.error('Failed to load achievements:', error);
      setError('Failed to load achievements');
    } finally {
      setLoading(false);
    }
  };

  const openModal = (achievement) => {
    setSelectedAchievement(achievement);
  };

  const closeModal = () => {
    setSelectedAchievement(null);
  };

  const openAddForm = () => {
    setShowAddForm(true);
  };

  const closeAddForm = () => {
    setShowAddForm(false);
    setFormData({
      title: '',
      event: '',
      position: '',
      date: '',
      image: '',
      description: '',
      details: '',
      technologies: ''
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
      const achievementData = {
        ...formData,
        technologies: formData.technologies.split(',').map(tech => tech.trim())
      };
      
      const response = await achievementAPI.create(achievementData);
      console.log('Achievement created:', response.data);
      
      setSuccessMessage('Achievement saved successfully!');
      await loadAchievements(); // Reload achievements
      closeAddForm();
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccessMessage(''), 3000);
      
    } catch (error) {
      console.error('Failed to create achievement:', error);
      setError(error.response?.data?.error || 'Failed to save achievement. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="explore">
        <div className="container">
          <div className="loading-state">
            <div className="loading-spinner"></div>
            <p>Loading achievements...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="explore">
      <div className="container">
        <div className="explore-header">
          <div className="header-content">
            <h1>🏆 Achievements & Awards</h1>
            <p>Showcasing my hackathon wins and competition achievements</p>
          </div>
          <button className="add-btn" onClick={openAddForm}>
            <span className="plus-icon">+</span>
            Add Achievement
          </button>
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
        
        <div className="achievements-grid">
          {achievements.map(achievement => (
            <div 
              key={achievement._id} 
              className="achievement-card"
              onClick={() => openModal(achievement)}
            >
              <div className="achievement-image">
                <img src={achievement.image} alt={achievement.title} />
                <div className="achievement-badge">{achievement.position}</div>
                <div className="card-overlay">
                  <span className="view-details">View Details</span>
                </div>
              </div>
              <div className="achievement-content">
                <h3>{achievement.title}</h3>
                <p className="event-name">{achievement.event}</p>
                <p className="achievement-date">{achievement.date}</p>
                <p className="achievement-description">{achievement.description}</p>
                <div className="tech-tags">
                  {achievement.technologies.slice(0, 3).map(tech => (
                    <span key={tech} className="tech-tag">{tech}</span>
                  ))}
                  {achievement.technologies.length > 3 && (
                    <span className="tech-tag more">+{achievement.technologies.length - 3}</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {achievements.length === 0 && !loading && (
          <div className="empty-state">
            <h3>No achievements yet</h3>
            <p>Click "Add Achievement" to create your first achievement card</p>
          </div>
        )}
      </div>

      {/* Add Achievement Form Modal */}
      {showAddForm && (
        <div className="modal-overlay" onClick={closeAddForm}>
          <div className="modal-content form-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeAddForm}>×</button>
            <div className="form-header">
              <h2>Add New Achievement</h2>
              <p>Fill in the details of your new achievement</p>
            </div>
            <form onSubmit={handleSubmit} className="achievement-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Title</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    placeholder="e.g., Smart City Hackathon Winner"
                  />
                </div>
                <div className="form-group">
                  <label>Event</label>
                  <input
                    type="text"
                    name="event"
                    value={formData.event}
                    onChange={handleInputChange}
                    required
                    placeholder="e.g., TechFest 2024"
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Position</label>
                  <input
                    type="text"
                    name="position"
                    value={formData.position}
                    onChange={handleInputChange}
                    required
                    placeholder="e.g., 1st Place, Winner"
                  />
                </div>
                <div className="form-group">
                  <label>Date</label>
                  <input
                    type="text"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    required
                    placeholder="e.g., March 2024"
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Image URL</label>
                <input
                  type="url"
                  name="image"
                  value={formData.image}
                  onChange={handleInputChange}
                  required
                  placeholder="https://example.com/image.jpg"
                />
              </div>
              <div className="form-group">
                <label>Short Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  rows="3"
                  placeholder="Brief description for the card"
                ></textarea>
              </div>
              <div className="form-group">
                <label>Detailed Description</label>
                <textarea
                  name="details"
                  value={formData.details}
                  onChange={handleInputChange}
                  required
                  rows="4"
                  placeholder="Detailed description for the modal"
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
                  placeholder="React, Node.js, MongoDB, Python"
                />
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
                    'Save Achievement'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Achievement Details Modal */}
      {selectedAchievement && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>×</button>
            <div className="modal-header">
              <img src={selectedAchievement.image} alt={selectedAchievement.title} />
              <div className="modal-info">
                <h2>{selectedAchievement.title}</h2>
                <p className="modal-event">{selectedAchievement.event}</p>
                <div className="modal-badge">{selectedAchievement.position}</div>
                <p className="modal-date">{selectedAchievement.date}</p>
              </div>
            </div>
            <div className="modal-body">
              <p>{selectedAchievement.details}</p>
              <div className="modal-technologies">
                <h4>Technologies Used:</h4>
                <div className="tech-list">
                  {selectedAchievement.technologies.map(tech => (
                    <span key={tech} className="tech-item">{tech}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Explore;