import React from 'react';
import './Footer.css'; // Create a CSS file for styling (Footer.css)

const Footer = () => {
  // eslint-disable-next-line 
  const handleGoToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-text">
            <p>&copy; {new Date().getFullYear()} Home Sweet Home. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
