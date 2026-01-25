import React, { useState, useEffect } from 'react';
import { visitorAPI } from '../services/api';
import AnimatedCounter from '../components/AnimatedCounter';
import './Home.css';

const Home = () => {
  const [typedText, setTypedText] = useState('');
  const [visitorCount, setVisitorCount] = useState(0);
  const roles = ['DSA Enthusiast', 'MERN Stack Developer', 'Problem Solver', 'Code Optimizer'];
  const [roleIndex, setRoleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const incrementVisitor = async () => {
      try {
        const response = await visitorAPI.incrementVisitor();
        setVisitorCount(response.data.count);
      } catch (error) {
        console.error('Error incrementing visitor:', error);
      }
    };
    incrementVisitor();
  }, []);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.3,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        } else {
          entry.target.classList.remove('active');
        }
      });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .journey-milestone');
    revealElements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const currentRole = roles[roleIndex];
    const typingSpeed = isDeleting ? 50 : 100;

    const timer = setTimeout(() => {
      if (!isDeleting && charIndex < currentRole.length) {
        setTypedText(currentRole.substring(0, charIndex + 1));
        setCharIndex(charIndex + 1);
      } else if (isDeleting && charIndex > 0) {
        setTypedText(currentRole.substring(0, charIndex - 1));
        setCharIndex(charIndex - 1);
      } else if (!isDeleting && charIndex === currentRole.length) {
        setTimeout(() => setIsDeleting(true), 1500);
      } else if (isDeleting && charIndex === 0) {
        setIsDeleting(false);
        setRoleIndex((roleIndex + 1) % roles.length);
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, roleIndex, roles]);

  return (
    <div className="home">
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <div className="hero-subtitle">
              <span>👋</span>
              <span>Hello, I'm</span>
            </div>
            <h1>Raja Nayak</h1>
            <h2>
              <span className="typing-text">{typedText}</span>
            </h2>
            <p>
              Passionate B.Tech student specializing in MERN stack development and DSA. 
              I create modern, responsive web applications with cutting-edge technologies 
              and solve complex algorithmic problems with optimized solutions.
            </p>
            <div className="hero-buttons">
              <a href="/projects" className="btn">View My Work</a>
              <a href="/contact" className="btn btn-outline">Let's Connect</a>
            </div>
            <div className="hero-stats">
              <div className="stat-item">
                <span className="stat-number">500+</span>
                <span className="stat-label">DSA Problems Solved</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">50+</span>
                <span className="stat-label">Projects Completed</span>
              </div>
              <div className="stat-item">
                <span className="stat-number"><AnimatedCounter end={visitorCount} /></span>
                <span className="stat-label">Total Visitors</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="coding-journey section">
        <div className="container">
          <div className="section-header">
            <h2 className="reveal">My Coding Journey</h2>
            <p className="section-subtitle reveal">Follow the path of my programming evolution</p>
          </div>
          
          <div className="journey-path">
            <div className="path-line"></div>
            
            <div className="journey-milestone" data-milestone="start">
              <div className="milestone-icon">
                <span>🚀</span>
              </div>
              <div className="milestone-content">
                <h3>Started Programming</h3>
                <p>Began my journey with Python and basic algorithms</p>
                <div className="milestone-stats">
                  <span>2022</span>
                </div>
              </div>
            </div>
            
            <div className="journey-milestone" data-milestone="leetcode">
              <div className="milestone-icon leetcode">
                <span>💻</span>
              </div>
              <div className="milestone-content">
                <h3>LeetCode Journey</h3>
                <p>Solved 500+ problems across all difficulty levels</p>
                <div className="milestone-stats">
                  <span>500+ Problems</span>
                  <span>Rating: 1800+</span>
                </div>
              </div>
            </div>
            
            <div className="journey-milestone" data-milestone="competitive">
              <div className="milestone-icon competitive">
                <span>🏆</span>
              </div>
              <div className="milestone-content">
                <h3>Competitive Programming</h3>
                <p>Active on CodeChef, Codeforces, and HackerRank</p>
                <div className="milestone-stats">
                  <span>CodeChef: 3⭐</span>
                  <span>Codeforces: Specialist</span>
                </div>
              </div>
            </div>
            
            <div className="journey-milestone" data-milestone="projects">
              <div className="milestone-icon projects">
                <span>🛠️</span>
              </div>
              <div className="milestone-content">
                <h3>Full Stack Development</h3>
                <p>Built multiple MERN stack applications and projects</p>
                <div className="milestone-stats">
                  <span>10+ Projects</span>
                  <span>MERN Stack</span>
                </div>
              </div>
            </div>
            
            <div className="journey-milestone" data-milestone="current">
              <div className="milestone-icon current">
                <span>🎯</span>
              </div>
              <div className="milestone-content">
                <h3>Current Focus</h3>
                <p>Exploring advanced algorithms and system design</p>
                <div className="milestone-stats">
                  <span>System Design</span>
                  <span>Advanced DSA</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="about section">
        <div className="container">
          <div className="section-header">
            <h2 className="reveal">About Me</h2>
          </div>
          <div className="about-content text-center">
            <p className="reveal">
              I'm a dedicated B.Tech student with a passion for creating innovative web solutions 
              and solving complex algorithmic problems. My expertise lies in the MERN stack and 
              Data Structures & Algorithms, where I combine theoretical knowledge with practical 
              implementation to build scalable applications.
            </p>
            <div className="skills reveal">
              <h3>Technical Skills</h3>
              <div className="skill-tags">
                <span>Data Structures</span>
                <span>Algorithms</span>
                <span>React.js</span>
                <span>Node.js</span>
                <span>MongoDB</span>
                <span>Express.js</span>
                <span>JavaScript ES6+</span>
                <span>C++</span>
                <span>Problem Solving</span>
                <span>System Design</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;