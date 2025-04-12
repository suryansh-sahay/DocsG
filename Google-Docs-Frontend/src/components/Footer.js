import React from 'react';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; 2023 Google Docs Clone</p>
        <ul className="social-icons">
          <li>
            <a href="https://www.linkedin.com/in/suryansh-sahay-2a426a27a/" target="_blank" rel="noreferrer">
            <i class="fa fa-linkedin-square" aria-hidden="true"></i>
            </a>
          </li>
          <li>
            <a href="https://github.com/suryansh-sahay" target="_blank" rel="noopener noreferrer">
            <i class="fa fa-github-square" aria-hidden="true"></i>
            </a>
          </li>
          <li>
            <a href="https://x.com/surya79955?s=08" target="_blank" rel="noopener noreferrer">
            <i class="fa fa-twitter-square" aria-hidden="true"></i>
            </a>
          </li>
        </ul>

      </div>
    </footer>
  );
}

export default Footer;
