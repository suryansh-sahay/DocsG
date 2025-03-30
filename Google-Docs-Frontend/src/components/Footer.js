import React from 'react';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; 2023 Google Docs Clone</p>
        <ul className="social-icons">
          <li>
            <a href="https://www.linkedin.com/in/soham-sawant-112293250/" target="_blank">
            <i class="fa fa-linkedin-square" aria-hidden="true"></i>
            </a>
          </li>
          <li>
            <a href="https://github.com/s0ham075" target="_blank" rel="noopener noreferrer">
            <i class="fa fa-github-square" aria-hidden="true"></i>
            </a>
          </li>
          <li>
            <a href="https://twitter.com/sohamsa30913657?t=y-np2Ic-t0qgvClxQZyIRA&s=08" target="_blank" rel="noopener noreferrer">
            <i class="fa fa-twitter-square" aria-hidden="true"></i>
            </a>
          </li>
        </ul>

      </div>
    </footer>
  );
}

export default Footer;
