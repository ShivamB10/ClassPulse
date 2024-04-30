
import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

export const HomePage = () => {
  return (
    <div className="home-container">
      <div className="hero-section">
        <h1 className="hero-title">Welcome to ClassPulse</h1>
        <p className="hero-subtitle">Enhance your learning experience with real-time feedback.</p>
        <div className="home-buttons">
          <Link to="/" className="btn btn-primary">
            Login
          </Link>
          <Link to="/classPulseregister" className="btn btn-primary">
            Register
          </Link>
        </div>
      </div>

      <div className="features-section">
        <h2 className="section-title">Features</h2>
        <div className="feature-cards">
          <div className="feature-card">
            <i className="fas fa-comments"></i>
            <h3>Real-time Feedback</h3>
            <p>Get instant feedback during lectures for better understanding.</p>
          </div>
          <div className="feature-card">
            <i className="fas fa-question-circle"></i>
            <h3>Interactive Quizzes</h3>
            <p>Engage with interactive quizzes and polls to reinforce your learning.</p>
          </div>
          <div className="feature-card">
            <i className="fas fa-chart-line"></i>
            <h3>Personalized Recommendations</h3>
            <p>Receive personalized learning recommendations based on your performance.</p>
          </div>
          <div className="feature-card">
            <i className="fas fa-users"></i>
            <h3>Collaborative Learning</h3>
            <p>Connect with classmates and collaborate for a better learning experience.</p>
          </div>
        </div>
      </div>
    </div>
  );
};


