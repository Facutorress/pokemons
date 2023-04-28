import React from 'react';
import { Link } from 'react-router-dom';
import styles from './nav.module.css';

function Nav() {
  return (
    <div className={styles.navbar}>
    <Link to="/Home" className={`${styles.link} ${styles.home}`}>
  Home
</Link>
<Link to="/create" className={`${styles.link} ${styles.create}`}>
  Create
</Link>

    </div>
  );
}

export default Nav;
