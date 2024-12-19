import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="social-links">
        <a href="https://in.linkedin.com/school/sahyadri/" target="_blank" rel="noopener noreferrer">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvVVYjkvTYaxmWpr5sAXbwkeI1lwK-s2QxbWmxJnT-hqx1JnLbZ5MQ8q047pgAsfoJZ_8&usqp=CAU" alt="LinkedIn" className="social-icon" />
        </a>
        <a href="https://www.instagram.com/sahyadri_college" target="_blank" rel="noopener noreferrer">
          <img src="https://upload.wikimedia.org/wikipedia/commons/e/e7/Instagram_logo_2016.svg" alt="Instagram" className="social-icon" />
        </a>
      </div>
      <p className="footer-text">© 2024 Sahyadri College Of Engineering & Management. All Rights Reserved.</p>
    </footer>
  );
}

export default Footer;
