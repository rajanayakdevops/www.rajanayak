import React from 'react';
import './SkeletonLoader.css';

const SkeletonLoader = ({ type = 'card', count = 3 }) => {
  if (type === 'projects') {
    return (
      <div className="skeleton-container">
        <div className="skeleton-header">
          <div className="skeleton skeleton-title"></div>
          <div className="skeleton skeleton-subtitle"></div>
          <div className="skeleton-filters">
            {[1,2,3,4,5].map(i => (
              <div key={i} className="skeleton skeleton-filter"></div>
            ))}
          </div>
        </div>
        <div className="skeleton-grid">
          {Array.from({length: count}).map((_, i) => (
            <div key={i} className="skeleton-card">
              <div className="skeleton skeleton-image"></div>
              <div className="skeleton-content">
                <div className="skeleton skeleton-card-title"></div>
                <div className="skeleton skeleton-text"></div>
                <div className="skeleton skeleton-text short"></div>
                <div className="skeleton-tags">
                  {[1,2,3].map(j => (
                    <div key={j} className="skeleton skeleton-tag"></div>
                  ))}
                </div>
                <div className="skeleton-buttons">
                  <div className="skeleton skeleton-button"></div>
                  <div className="skeleton skeleton-button"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (type === 'contact') {
    return (
      <div className="skeleton-container">
        <div className="skeleton-header">
          <div className="skeleton skeleton-title"></div>
          <div className="skeleton skeleton-subtitle"></div>
        </div>
        <div className="skeleton-contact-grid">
          <div className="skeleton-contact-info">
            <div className="skeleton skeleton-card-title"></div>
            <div className="skeleton skeleton-text"></div>
            <div className="skeleton skeleton-text short"></div>
            {[1,2,3,4].map(i => (
              <div key={i} className="skeleton-contact-item">
                <div className="skeleton skeleton-icon"></div>
                <div className="skeleton skeleton-text"></div>
              </div>
            ))}
          </div>
          <div className="skeleton-form">
            {[1,2,3].map(i => (
              <div key={i} className="skeleton-form-group">
                <div className="skeleton skeleton-label"></div>
                <div className="skeleton skeleton-input"></div>
              </div>
            ))}
            <div className="skeleton skeleton-button large"></div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default SkeletonLoader;