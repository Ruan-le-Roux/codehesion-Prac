import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './CSS/NavBar.module.css';

function NavBar() {
    const location = useLocation();

    const links = [
        { name: 'Home', path: '/home' },
        { name: 'Tags', path: '/tags' },
        { name: 'Categories', path: '/category' },
        { name: 'Register User', path: '/register' },
        { name: 'Update User', path: '/updateUser' },
    ];

    return (
        <nav className={styles.navbar}>
            <div className={styles.links}>
                {links.map((link) => (
                    <Link
                        key={link.path}
                        to={link.path}
                        className={location.pathname === link.path ? styles.active : ''}
                    >
                        {link.name}
                    </Link>
                ))}
            </div>
        </nav>
    );
}

export default NavBar;
