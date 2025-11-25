import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import profileData from './data/profile.json';
import publicationsData from './data/publications.json';
import experienceData from './data/experience.json';
import postsData from './data/posts.json';
import { Github, Twitter, Mail, BookOpen, ExternalLink, ArrowLeft } from 'lucide-react';

function App() {
    const [activeTab, setActiveTab] = useState('home');
    const [currentPost, setCurrentPost] = useState(null);
    const [postContent, setPostContent] = useState('');

    useEffect(() => {
        if (activeTab === 'post-view' && currentPost) {
            fetch(`./posts/${currentPost}.md`)
                .then(res => res.text())
                .then(text => setPostContent(text))
                .catch(err => console.error(err));
        }
    }, [activeTab, currentPost]);

    const handlePostClick = (slug) => {
        setCurrentPost(slug);
        setActiveTab('post-view');
        window.scrollTo(0, 0);
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'post-view':
                return (
                    <div className="section animate-fade-in">
                        <button
                            onClick={() => setActiveTab('blog')}
                            className="btn"
                            style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                        >
                            <ArrowLeft size={16} /> Back to Blog
                        </button>
                        <article className="markdown-content">
                            <ReactMarkdown>{postContent}</ReactMarkdown>
                        </article>
                    </div>
                );
            case 'publications':
                return (
                    <div className="section animate-fade-in">
                        <h2>Publications</h2>
                        {publicationsData.map((pub, index) => (
                            <div key={index} className="card">
                                <div className="card-title">
                                    <a href={pub.link} target="_blank" rel="noopener noreferrer">
                                        {pub.title}
                                    </a>
                                </div>
                                <div className="card-meta">{pub.year}</div>
                            </div>
                        ))}
                    </div>
                );
            case 'teaching':
            case 'cv': // Combine teaching and experience for CV view
                return (
                    <div className="section animate-fade-in">
                        <h2>Experience & Teaching</h2>
                        {experienceData.map((exp, index) => (
                            <div key={index} className="card">
                                <div className="card-title">{exp.role}</div>
                                <div className="card-meta">{exp.institution} | {exp.location} | {exp.period}</div>
                                <p className="card-desc">{exp.description}</p>
                            </div>
                        ))}
                    </div>
                );
            case 'blog':
                return (
                    <div className="section animate-fade-in">
                        <h2>Blog Posts</h2>
                        {postsData.map((post, index) => (
                            <div key={index} className="card">
                                <div className="card-title">
                                    <a
                                        href="#"
                                        onClick={(e) => { e.preventDefault(); handlePostClick(post.slug); }}
                                    >
                                        {post.title}
                                    </a>
                                </div>
                                <div className="card-meta">{post.date}</div>
                                <p className="card-desc">{post.summary}</p>
                            </div>
                        ))}
                    </div>
                );
            case 'home':
            default:
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
                        <p style={{ maxWidth: '600px', marginBottom: '2rem' }}>
                            {profileData.bio}
                        </p>

                        <h3>Recent Publications</h3>
                        {publicationsData.slice(0, 3).map((pub, index) => (
                            <div key={index} className="card">
                                <div className="card-title">
                                    <a href={pub.link} target="_blank" rel="noopener noreferrer">
                                        {pub.title}
                                    </a>
                                </div>
                                <div className="card-meta">{pub.year}</div>
                            </div>
                        ))}
                        <button className="btn" onClick={() => setActiveTab('publications')}>View All Publications</button>
                    </div>
                );
        }
    };

    return (
        <div className="container">
            <header>
                <nav>
                    <ul>
                        <li><a href="#" className={activeTab === 'home' ? 'active' : ''} onClick={(e) => { e.preventDefault(); setActiveTab('home'); }}>Home</a></li>
                        <li><a href="#" className={activeTab === 'publications' ? 'active' : ''} onClick={(e) => { e.preventDefault(); setActiveTab('publications'); }}>Publications</a></li>
                        <li><a href="#" className={activeTab === 'teaching' ? 'active' : ''} onClick={(e) => { e.preventDefault(); setActiveTab('teaching'); }}>Teaching</a></li>
                        <li><a href="#" className={activeTab === 'blog' ? 'active' : ''} onClick={(e) => { e.preventDefault(); setActiveTab('blog'); }}>Blog</a></li>
                    </ul>
                </nav>
            </header>

            <main>
                {renderContent()}
            </main>

            <footer>
                <p>&copy; {new Date().getFullYear()} {profileData.name}. All rights reserved.</p>
            </footer>
        </div>
    );
}

export default App;
