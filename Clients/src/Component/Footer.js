import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-brand">
          <h2>🌐 Sanjit Developer</h2>
          <p>Building modern, scalable web solutions with React & Node.js.</p>
        </div>

        <div className="footer-links">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/register">Sign Up</a></li>
            <li><a href="/login">Login</a></li>
          </ul>
        </div>

        <div className="footer-links">
          <h4>Company</h4>
          <ul>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Our Services</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </div>

        <div className="footer-social">
          <h4>Follow Us</h4>
          <div className="social-icons">
            <a href="#"><img src="https://i.ibb.co/QYQxPzb/facebook.png" alt="Facebook" /></a>
            <a href="#"><img src="https://i.ibb.co/VgHyPMJ/insta.png" alt="Instagram" /></a>
            <a href="#"><img src="https://i.ibb.co/rMZxD0v/youtube1.png" alt="YouTube" /></a>
          </div>
        </div>
      </div>

      <hr className="footer-divider" />

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} <strong>Sanjit Developer</strong> — All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
