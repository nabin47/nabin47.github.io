import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import projectsData from '../data/projects.json';
import yaml from 'js-yaml';

export function ProjectView() {
    const { slug } = useParams();
    const [content, setContent] = useState('');
    const [metadata, setMetadata] = useState(null);
    const [project, setProject] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const proj = projectsData.find(p => p.slug === slug);
        setProject(proj);

        if (proj && proj.content) {
            fetch(`/content/projects/${proj.content}`)
                .then(res => {
                    if (!res.ok) throw new Error(`Failed to fetch content: ${res.status} ${res.statusText}`);
                    return res.text();
                })
                .then(text => {
                    if (text.trim().startsWith('<!DOCTYPE html>') || text.trim().startsWith('<html')) {
                        throw new Error('Received HTML instead of Markdown. File might be missing.');
                    }
                    try {
                        const matches = text.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
                        if (matches) {
                            const frontmatter = matches[1];
                            const body = matches[2];
                            const data = yaml.load(frontmatter);
                            setMetadata(data);
                            setContent(body);
                        } else {
                            setContent(text);
                            setMetadata({});
                        }
                    } catch (e) {
                        throw new Error(`Frontmatter parsing error: ${e.message}`);
                    }
                })
                .catch(err => {
                    console.error('Error loading project:', err);
                    setError(err.message);
                });
        }
    }, [slug]);

    if (error) return (
        <div className="section">
            <div style={{ color: 'red', padding: '1rem', border: '1px solid red', borderRadius: '8px' }}>
                <h3>Error Loading Project</h3>
                <p>{error}</p>
                <p>Path: {project ? `/content/projects/${project.content}` : 'Unknown'}</p>
            </div>
            <Link to="/projects" className="btn">Back to Projects</Link>
        </div>
    );

    if (!project) return <div>Loading...</div>;

    return (
        <div className="section animate-fade-in">
            <Link to="/projects" className="btn" style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem', width: 'fit-content' }}>
                <ArrowLeft size={16} /> Back to Projects
            </Link>
            <article className="markdown-content">
                <h1>{metadata?.title || project.title}</h1>

                <div className="card-meta" style={{ marginBottom: '2rem', display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
                    <span>
                        {metadata?.date || project.date}
                    </span>
                    {metadata?.association && <span>| {metadata.association}</span>}
                    {(metadata?.projectUrl || project?.projectUrl) && (
                        <>
                            <span>|</span>
                            {(() => {
                                const pUrl = metadata?.projectUrl || project?.projectUrl;
                                const markdownLinkMatch = pUrl.match(/\[(.*?)\]\((.*?)\)/);
                                const url = markdownLinkMatch ? markdownLinkMatch[2] : pUrl;
                                const text = markdownLinkMatch ? markdownLinkMatch[1] : 'Show Project';
                                return (
                                    <a href={url} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--link-color)', fontWeight: '500' }}>
                                        {text}
                                    </a>
                                );
                            })()}
                        </>
                    )}
                </div>

                {metadata?.skills && (
                    <div style={{ marginBottom: '2rem', display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                        {metadata.skills.map((skill, index) => (
                            <span key={index} style={{
                                backgroundColor: 'var(--code-bg)',
                                padding: '0.2rem 0.6rem',
                                borderRadius: '4px',
                                fontSize: '0.9rem',
                                color: 'var(--text-secondary)'
                            }}>
                                {skill}
                            </span>
                        ))}
                    </div>
                )}

                <div style={{ marginBottom: '3rem' }}>
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
                </div>
            </article>
        </div>
    );
}

export default function Projects() {
    return (
        <div className="section animate-fade-in">
            <h2>Projects</h2>
            {projectsData.map((project, index) => (
                <div key={index} className="card">
                    <div className="card-title">
                        <Link to={`/projects/${project.slug}`}>
                            {project.title}
                        </Link>
                    </div>
                    <div className="card-meta" style={{ marginBottom: '0.5rem' }}>{project.date}</div>
                    {project.skills && (
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.5rem' }}>
                            {project.skills.slice(0, 3).map((skill, idx) => (
                                <span key={idx} style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', backgroundColor: 'var(--card-hover-bg)', padding: '0.1rem 0.4rem', borderRadius: '3px' }}>
                                    {skill}
                                </span>
                            ))}
                            {project.skills.length > 3 && <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>+{project.skills.length - 3} more</span>}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}
