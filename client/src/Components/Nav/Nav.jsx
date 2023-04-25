import React from 'react';
import { Link } from 'react-router-dom';
import styles from './nav.module.css';

function Nav() {
  return (
    <div className={styles.navbar}>
      <Link className={styles.link} to="/Home">
        Home
      </Link>
      <Link className={styles.link} to="/Create">
        Create
      </Link>
    </div>
  );
}

export default Nav;
