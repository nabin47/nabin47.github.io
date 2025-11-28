import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, BookOpen, Github, Twitter, ExternalLink } from 'lucide-react';
import profileData from '../data/profile.json';
import publicationsData from '../data/publications.json';

export default function Home() {
    return (
        <div className="section animate-fade-in">
            <div className="profile-header">
                {profileData.image && (
                    <img
                        src={profileData.image}
                        alt={profileData.name}
                        className="profile-image"
                    />
                )}
                <h1 className="profile-name">{profileData.name}</h1>
                <p className="profile-title">{profileData.title}</p>
                <p className="card-meta">{profileData.institution} • {profileData.location}</p>

                <div className="social-links">
                    <a href={`mailto:${profileData.email}`} aria-label="Email"><Mail size={20} /></a>
                    <a href={profileData.social.googleScholar} target="_blank" rel="noopener noreferrer" aria-label="Google Scholar"><BookOpen size={20} /></a>
                    <a href={profileData.social.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub"><Github size={20} /></a>
                    <a href={profileData.social.twitter} target="_blank" rel="noopener noreferrer" aria-label="Twitter"><Twitter size={20} /></a>
                    {profileData.social.researchGate && (
                        <a href={profileData.social.researchGate} target="_blank" rel="noopener noreferrer" aria-label="ResearchGate"><ExternalLink size={20} /></a>
                    )}
                </div>
            </div>

            <h3>About Me</h3>
            <p style={{ marginBottom: '2rem' }}>
                {profileData.bio}
            </p>

            {profileData.researchInterests && (
                <>
                    <h3>Research Interests</h3>
                    <p style={{ marginBottom: '1rem' }}>My research interests involve:</p>
                    <ul style={{ paddingLeft: '1.5rem', marginBottom: '2rem' }}>
                        {profileData.researchInterests.map((interest, index) => (
                            <li key={index} style={{ marginBottom: '0.5rem' }}>
                                <strong style={{ color: 'var(--link-color)' }}>[{interest.category}]</strong> {interest.description}
                            </li>
                        ))}
                    </ul>
                </>
            )}

            <h3>Recent Publications</h3>
            {publicationsData.slice(0, 3).map((pub, index) => (
                <div key={index} className="card">
                    <div className="card-title">
                        <Link to={`/publications/${pub.slug}`}>
                            {pub.title}
                        </Link>
                    </div>
                    <div className="card-meta">{pub.year}</div>
                </div>
            ))}
            <Link to="/publications" className="btn">View All Publications</Link>
        </div>
    );
}
