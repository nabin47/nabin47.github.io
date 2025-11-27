import React, { useState } from 'react';
import { NavLink, Outlet, Link } from 'react-router-dom';
import { Mail, BookOpen, Github, Twitter, ExternalLink, Menu, X } from 'lucide-react';
import profileData from '../data/profile.json';
import ThemeToggle from './ThemeToggle';

export default function Layout() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const closeMenu = () => setIsMenuOpen(false);

    return (
        <div className="container">
            <header>
                <nav>
                    <div className="nav-header">
                        <div className="mobile-menu-btn">
                            <button onClick={toggleMenu} aria-label="Toggle Menu" className="btn-icon">
                                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                            </button>
                        </div>
                        <Link to="/" className="nav-brand" onClick={closeMenu}>
                            {profileData.name}
                        </Link>
                        <div className="theme-toggle-wrapper">
                            <ThemeToggle />
                        </div>
                    </div>

                    <ul className={`nav-links ${isMenuOpen ? 'open' : ''}`}>

                        <li><NavLink to="/publications" onClick={closeMenu} className={({ isActive }) => isActive ? 'active' : ''}>Publications</NavLink></li>
                        <li><NavLink to="/experience" onClick={closeMenu} className={({ isActive }) => isActive ? 'active' : ''}>Teaching & Experience</NavLink></li>
                        <li><NavLink to="/blog" onClick={closeMenu} className={({ isActive }) => isActive ? 'active' : ''}>Blog</NavLink></li>
                    </ul>
                </nav>
            </header>

            <main>
                <Outlet />
            </main>

            <footer style={{ textAlign: 'center', marginTop: '3rem' }}>
                <p>&copy; {new Date().getFullYear()} {profileData.name}. All rights reserved.</p>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
                    Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
            </footer>
        </div>
    );
}
