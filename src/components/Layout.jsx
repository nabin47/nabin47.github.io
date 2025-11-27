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
                    <Link to="/" className="nav-brand" onClick={closeMenu}>
                        {profileData.name}
                    </Link>

                    <div className="desktop-nav">
                        <ul className="nav-links">
                            <li><NavLink to="/publications" className={({ isActive }) => isActive ? 'active' : ''}>Publications</NavLink></li>
                            <li><NavLink to="/experience" className={({ isActive }) => isActive ? 'active' : ''}>Teaching & Experience</NavLink></li>
                            <li><NavLink to="/blog" className={({ isActive }) => isActive ? 'active' : ''}>Blog</NavLink></li>
                        </ul>
                        <ThemeToggle />
                    </div>

                    <div className="mobile-nav-controls">
                        <ThemeToggle />
                        <button onClick={toggleMenu} aria-label="Toggle Menu" className="btn-icon mobile-menu-btn">
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </nav>

                <div className={`mobile-menu ${isMenuOpen ? 'open' : ''}`}>
                    <ul className="mobile-nav-links">
                        <li><NavLink to="/publications" onClick={closeMenu} className={({ isActive }) => isActive ? 'active' : ''}>Publications</NavLink></li>
                        <li><NavLink to="/experience" onClick={closeMenu} className={({ isActive }) => isActive ? 'active' : ''}>Teaching & Experience</NavLink></li>
                        <li><NavLink to="/blog" onClick={closeMenu} className={({ isActive }) => isActive ? 'active' : ''}>Blog</NavLink></li>
                    </ul>
                </div>
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
