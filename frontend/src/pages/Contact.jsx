import React, { useState, useEffect } from 'react';
import { contactAPI, testimonialAPI } from '../services/api';
import SkeletonLoader from '../components/SkeletonLoader';
import Footer from '../components/Footer';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [showErrorDialog, setShowErrorDialog] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const testimonialsResponse = await testimonialAPI.getTestimonials();
        setTestimonials(testimonialsResponse.data);
      } catch (error) {
        console.error('Error fetching testimonials:', error);
      }
    };
    
    fetchData();
    
    const timer = setTimeout(() => {
      setLoading(false);
      setTimeout(() => setFadeIn(true), 100);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setStatus('');
    setShowSuccessDialog(false);
    setShowErrorDialog(false);

    try {
      console.log('Submitting form data:', formData);
      const response = await contactAPI.sendMessage(formData);
      console.log('Form submission successful:', response);
      
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setShowSuccessDialog(true);
      
      // Auto-hide success dialog after 4 seconds
      setTimeout(() => {
        setShowSuccessDialog(false);
      }, 4000);
      
    } catch (error) {
      console.error('Form submission error:', error);
      console.error('Error response:', error.response);
      console.error('Error message:', error.message);
      
      setStatus('error');
      setShowErrorDialog(true);
      
      // Auto-hide error dialog after 4 seconds
      setTimeout(() => {
        setShowErrorDialog(false);
      }, 4000);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <SkeletonLoader type="contact" />;
  }

  return (
    <div className={`contact-page ${fadeIn ? 'fade-in-active' : ''}`}>
      {/* Animated Background */}
      <div className="contact-background">
        <div className="floating-particles">
          <div className="particle particle-1"></div>
          <div className="particle particle-2"></div>
          <div className="particle particle-3"></div>
          <div className="particle particle-4"></div>
          <div className="particle particle-5"></div>
          <div className="particle particle-6"></div>
        </div>
        <div className="gradient-orbs">
          <div className="orb orb-1"></div>
          <div className="orb orb-2"></div>
          <div className="orb orb-3"></div>
        </div>
      </div>

      <div className="container">
        <div className="contact-header fade-item" style={{animationDelay: '0.1s'}}>
          <h1>Let's Create Something Amazing</h1>
          <p className="subtitle">
            Ready to bring your ideas to life? I'm here to help you build exceptional digital experiences. 
            Let's discuss your project and explore how we can work together to achieve your goals.
          </p>
        </div>
        
        <div className="contact-content">
          <div className="contact-info fade-item" style={{animationDelay: '0.2s'}}>
            <div className="info-header">
              <h3>Get In Touch</h3>
              <p>
                I'm currently available for freelance projects and full-time opportunities. 
                Whether you have a question, project idea, or just want to connect, I'd love to hear from you!
              </p>
            </div>
            
            <div className="contact-details">
              <div className="contact-item">
                <div className="contact-icon email">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.89 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                  </svg>
                </div>
                <div className="contact-text">
                  <strong>Email</strong>
                  <span>btsmemberkim@gmail.com</span>
                </div>
              </div>
              
              <div className="contact-item">
                <div className="contact-icon phone">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                  </svg>
                </div>
                <div className="contact-text">
                  <strong>Phone</strong>
                  <span>+91 XXXXX XXXXX</span>
                </div>
              </div>
              
              <div className="contact-item">
                <div className="contact-icon location">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                  </svg>
                </div>
                <div className="contact-text">
                  <strong>Location</strong>
                  <span>India</span>
                </div>
              </div>
              
              <div className="contact-item">
                <div className="contact-icon time">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/>
                    <path d="m12.5 7-1 0 0 6 5.25 3.15.75-1.23-4.5-2.67z"/>
                  </svg>
                </div>
                <div className="contact-text">
                  <strong>Response Time</strong>
                  <span>Within 24 hours</span>
                </div>
              </div>
            </div>
            
            <div className="social-section">
              <h4>Connect With Me</h4>
              <div className="social-links">
                <a href="https://github.com/rajanayak" className="social-link github" title="GitHub">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
                <a href="https://linkedin.com/in/rajanayak" className="social-link linkedin" title="LinkedIn">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
                <a href="https://leetcode.com/rajanayakdevops" className="social-link leetcode" title="LeetCode">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          <form className="contact-form fade-item" style={{animationDelay: '0.3s'}} onSubmit={handleSubmit}>
            <div className="form-header">
              <h3>Send Me a Message</h3>
              <p>Fill out the form below and I'll get back to you as soon as possible.</p>
            </div>

            <div className="form-group">
              <label htmlFor="name">Full Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="email">Email Address *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email address"
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="message">Message *</label>
              <textarea
                id="message"
                name="message"
                rows="6"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell me about your project, ask a question, or just say hello!"
                required
              ></textarea>
            </div>
            
            <button type="submit" className="btn btn-submit" disabled={submitting}>
              {submitting ? (
                <>
                  <span className="spinner"></span>
                  Sending Message...
                </>
              ) : (
                <>
                  <span>🚀</span>
                  Send Message
                </>
              )}
            </button>
          </form>
        </div>

        {/* Success Dialog */}
        {showSuccessDialog && (
          <div className="dialog-overlay">
            <div className="dialog-box success-dialog">
              <div className="dialog-icon">✅</div>
              <h3>Message Sent Successfully!</h3>
              <p>Thank you for reaching out. I'll get back to you within 24 hours.</p>
              <button 
                className="dialog-close" 
                onClick={() => setShowSuccessDialog(false)}
              >
                ×
              </button>
            </div>
          </div>
        )}

        {/* Error Dialog */}
        {showErrorDialog && (
          <div className="dialog-overlay">
            <div className="dialog-box error-dialog">
              <div className="dialog-icon">❌</div>
              <h3>Failed to Send Message</h3>
              <p>Please try again or contact me directly at btsmemberkim@gmail.com</p>
              <button 
                className="dialog-close" 
                onClick={() => setShowErrorDialog(false)}
              >
                ×
              </button>
            </div>
          </div>
        )}

        {/* Testimonials Section */}
        {testimonials.length > 0 && (
          <div className="testimonials-section fade-item" style={{animationDelay: '0.4s'}}>
            <h2>What People Say</h2>
            <div className="testimonials-grid">
              {testimonials.slice(0, 4).map((testimonial, index) => (
                <div key={testimonial._id} className="testimonial-card" style={{animationDelay: `${0.5 + (index * 0.1)}s`}}>
                  <div className="testimonial-content">
                    <div className="stars">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <span key={i} className="star">⭐</span>
                      ))}
                    </div>
                    <p>"{testimonial.message}"</p>
                  </div>
                  <div className="testimonial-author">
                    <div className="author-avatar">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div className="author-info">
                      <strong>{testimonial.name}</strong>
                      <span>{testimonial.position} at {testimonial.company}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default Contact;