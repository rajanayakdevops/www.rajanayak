import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Projects from './pages/Projects';
import Explore from './pages/Explore';
import Contact from './pages/Contact';
import './App.css';

function App() {
  useEffect(() => {
    // Improved scroll reveal animation
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          // Stop observing once animated
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Initial check for elements already in view
    const checkInitialVisibility = () => {
      const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
      revealElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        // If element is already in view, show it immediately
        if (rect.top < windowHeight && rect.bottom > 0) {
          el.classList.add('active');
        } else {
          observer.observe(el);
        }
      });
    };

    // Run after a short delay to ensure DOM is ready
    const timer = setTimeout(checkInitialVisibility, 100);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  return (
    <BrowserRouter basename='/'>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

// making some mino changes right 

export default App;