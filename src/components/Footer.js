import React from 'react';

const Footer = () => {
  const styles = require('./Footer.scss');
  return (
    <div className={styles.Footer}>
      <nav>
        <ul>
          <li>
            <a
              href="https://github.com/BBB/materialcalculator.com"
              alt="Open Source Code"
            >
              View Source on Github
            </a>
          </li>
          <li>
            <a
              href="https://ollie.relph.me"
              alt="Portfolio of Ollie Relph"
            >
              Created by Ollie Relph
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Footer;
