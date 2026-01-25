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
            <h2 className="reveal">My Coding Profiles</h2>
            <p className="section-subtitle reveal">Explore my competitive programming journey across different platforms</p>
          </div>
          
          <div className="coding-profiles-scroll">
            <div className="platform-card leetcode reveal">
              <div className="platform-header">
                <div className="platform-logo">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0z"/>
                  </svg>
                </div>
                <div className="platform-info">
                  <h3>LeetCode</h3>
                  <p>@rajanayakdevops</p>
                  <div className="platform-stat">500+ Problems Solved</div>
                </div>
              </div>
              <a href="https://leetcode.com/rajanayakdevops" target="_blank" rel="noopener noreferrer" className="platform-link">
                Visit Profile
              </a>
            </div>
            
            <div className="platform-card codechef reveal">
              <div className="platform-header">
                <div className="platform-logo">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M11.5 0c-.4 0-.8.1-1.1.4L.4 10.4c-.5.5-.5 1.4 0 1.9l10 10c.3.3.7.4 1.1.4s.8-.1 1.1-.4l10-10c.5-.5.5-1.4 0-1.9L12.6.4c-.3-.3-.7-.4-1.1-.4zm0 2.8L20.2 11.5 11.5 20.2 2.8 11.5 11.5 2.8z"/>
                  </svg>
                </div>
                <div className="platform-info">
                  <h3>CodeChef</h3>
                  <p>@coderaja270119</p>
                  <div className="platform-stat">3★ Rating</div>
                </div>
              </div>
              <a href="https://www.codechef.com/users/coderaja270119" target="_blank" rel="noopener noreferrer" className="platform-link">
                Visit Profile
              </a>
            </div>
            
            <div className="platform-card codeforces reveal">
              <div className="platform-header">
                <div className="platform-logo">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M4.5 7.5A1.5 1.5 0 0 1 6 9v10.5A1.5 1.5 0 0 1 4.5 21h-3A1.5 1.5 0 0 1 0 19.5V9a1.5 1.5 0 0 1 1.5-1.5h3zm9-4.5A1.5 1.5 0 0 1 15 4.5v15a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 19.5v-15A1.5 1.5 0 0 1 10.5 3h3zm9-3A1.5 1.5 0 0 1 24 1.5v21a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 18 22.5v-21A1.5 1.5 0 0 1 19.5 0h3z"/>
                  </svg>
                </div>
                <div className="platform-info">
                  <h3>Codeforces</h3>
                  <p>@coderaja270119</p>
                  <div className="platform-stat">Specialist</div>
                </div>
              </div>
              <a href="https://codeforces.com/profile/coderaja270119" target="_blank" rel="noopener noreferrer" className="platform-link">
                Visit Profile
              </a>
            </div>

            <div className="platform-card hackerrank reveal">
              <div className="platform-header">
                <div className="platform-logo">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c1.285 0 2.455.467 3.35 1.243l.096.084 4.605 4.605c.776.895 1.243 2.065 1.243 3.35v5.436c0 1.285-.467 2.455-1.243 3.35l-.084.096-4.605 4.605c-.895.776-2.065 1.243-3.35 1.243H6.564c-1.285 0-2.455-.467-3.35-1.243l-.096-.084L.513 18.08C-.263 17.185-.73 16.015-.73 14.73V9.294c0-1.285.467-2.455 1.243-3.35l.084-.096L5.202 1.243C6.097.467 7.267 0 8.552 0H12zm0 5.8L9.4 8.4 12 11l2.6-2.6L12 5.8zm0 4.4l-2.6 2.6L12 15.4l2.6-2.6L12 10.2z"/>
                  </svg>
                </div>
                <div className="platform-info">
                  <h3>HackerRank</h3>
                  <p>@rajanayak</p>
                  <div className="platform-stat">5★ Problem Solving</div>
                </div>
              </div>
              <a href="https://www.hackerrank.com/rajanayak" target="_blank" rel="noopener noreferrer" className="platform-link">
                Visit Profile
              </a>
            </div>

            <div className="platform-card geeksforgeeks reveal">
              <div className="platform-header">
                <div className="platform-logo">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M21.45 14.315c-.143.28-.334.532-.565.745a3.691 3.691 0 0 1-1.104.565 4.677 4.677 0 0 1-1.425.213 4.677 4.677 0 0 1-1.425-.213 3.691 3.691 0 0 1-1.104-.565 2.795 2.795 0 0 1-.565-.745 2.054 2.054 0 0 1-.213-1.104v-.426c0-.14.047-.28.14-.426.094-.14.234-.234.426-.234h3.195c.192 0 .332.094.426.234.094.146.14.286.14.426v.426c0 .384.094.745.286 1.104.192.334.426.565.745.745.334.192.695.286 1.104.286.384 0 .745-.094 1.104-.286.334-.192.565-.426.745-.745.192-.334.286-.695.286-1.104v-.426c0-.384-.094-.745-.286-1.104a2.795 2.795 0 0 0-.745-.745 3.691 3.691 0 0 0-1.104-.565 4.677 4.677 0 0 0-1.425-.213H5.64c-.384 0-.745.094-1.104.286-.334.192-.565.426-.745.745-.192.334-.286.695-.286 1.104v8.52c0 .384.094.745.286 1.104.192.334.426.565.745.745.334.192.695.286 1.104.286h13.65c.192 0 .332-.094.426-.234.094-.146.14-.286.14-.426v-.426c0-.14-.047-.28-.14-.426-.094-.14-.234-.234-.426-.234H5.64c-.14 0-.286-.047-.426-.14a.965.965 0 0 1-.234-.426c-.047-.14-.047-.286-.047-.426v-8.52c0-.14.047-.286.14-.426.094-.14.234-.234.426-.234h12.195c.384 0 .745-.094 1.104-.286.334-.192.565-.426.745-.745.192-.334.286-.695.286-1.104v-.426c0-.384-.094-.745-.286-1.104z"/>
                  </svg>
                </div>
                <div className="platform-info">
                  <h3>GeeksforGeeks</h3>
                  <p>@rajanayak</p>
                  <div className="platform-stat">300+ Problems</div>
                </div>
              </div>
              <a href="https://auth.geeksforgeeks.org/user/rajanayak" target="_blank" rel="noopener noreferrer" className="platform-link">
                Visit Profile
              </a>
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