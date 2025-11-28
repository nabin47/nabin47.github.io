import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import publicationsData from '../data/publications.json';
import yaml from 'js-yaml';

export function PublicationView() {
    const { slug } = useParams();
    const [content, setContent] = useState('');
    const [metadata, setMetadata] = useState(null);
    const [publication, setPublication] = useState(null);
    const [copied, setCopied] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const pub = publicationsData.find(p => p.slug === slug);
        setPublication(pub);

        if (pub && pub.content) {
            fetch(`/content/publications/${pub.content}`)
                .then(res => {
                    if (!res.ok) throw new Error(`Failed to fetch content: ${res.status} ${res.statusText}`);
                    return res.text();
                })
                .then(text => {
                    // Check if we got HTML back (SPA fallback)
                    if (text.trim().startsWith('<!DOCTYPE html>') || text.trim().startsWith('<html')) {
                        throw new Error('Received HTML instead of Markdown. File might be missing.');
                    }
                    try {
                        // Manual frontmatter parsing to avoid Buffer issue with gray-matter
                        const matches = text.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
                        if (matches) {
                            const frontmatter = matches[1];
                            const body = matches[2];
                            const data = yaml.load(frontmatter);
                            setMetadata(data);
                            setContent(body);
                        } else {
                            // Fallback if no frontmatter found or malformed
                            setContent(text);
                            setMetadata({});
                        }
                    } catch (e) {
                        throw new Error(`Frontmatter parsing error: ${e.message}`);
                    }
                })
                .catch(err => {
                    console.error('Error loading publication:', err);
                    setError(err.message);
                });
        }
    }, [slug]);

    if (error) return (
        <div className="section">
            <div style={{ color: 'red', padding: '1rem', border: '1px solid red', borderRadius: '8px' }}>
                <h3>Error Loading Publication</h3>
                <p>{error}</p>
                <p>Path: {publication ? `/content/publications/${publication.content}` : 'Unknown'}</p>
            </div>
            <Link to="/publications" className="btn">Back to Publications</Link>
        </div>
    );

    const handleCopyCitation = () => {
        if (metadata?.citation) {
            navigator.clipboard.writeText(metadata.citation);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    if (!publication) return <div>Loading...</div>;

    return (
        <div className="section animate-fade-in">
            <Link to="/publications" className="btn" style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem', width: 'fit-content' }}>
                <ArrowLeft size={16} /> Back to Publications
            </Link>
            <article className="markdown-content">
                <h1>{metadata?.title || publication.title}</h1>

                <div className="card-meta" style={{ marginBottom: '2rem', display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
                    {metadata?.category && (
                        <span style={{ textTransform: 'capitalize', backgroundColor: 'var(--card-hover-bg)', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>
                            {metadata.category}
                        </span>
                    )}
                    <span>
                        {metadata?.date ? new Date(metadata.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : publication.year}
                    </span>
                    {metadata?.venue && <span>| {metadata.venue}</span>}
                </div>

                {metadata?.paperurl && (
                    <div style={{ marginBottom: '2rem' }}>
                        {(() => {
                            const markdownLinkMatch = metadata.paperurl.match(/\[(.*?)\]\((.*?)\)/);
                            if (markdownLinkMatch) {
                                return (
                                    <a href={markdownLinkMatch[2]} target="_blank" rel="noopener noreferrer" className="btn">
                                        Paper: {markdownLinkMatch[1]}
                                    </a>
                                );
                            }
                            return (
                                <a href={metadata.paperurl} target="_blank" rel="noopener noreferrer" className="btn">
                                    Download Paper
                                </a>
                            );
                        })()}
                    </div>
                )}

                <div style={{ marginBottom: '3rem' }}>
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
                </div>

                {metadata?.citation && (
                    <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '2rem' }}>
                        <h3>Citation</h3>
                        <div style={{
                            backgroundColor: 'var(--code-bg)',
                            padding: '1.5rem',
                            borderRadius: '8px',
                            marginBottom: '1rem',
                            fontSize: '0.9rem',
                            position: 'relative'
                        }}>
                            {metadata.citation}
                        </div>
                        <button
                            onClick={handleCopyCitation}
                            className="btn"
                            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                        >
                            {copied ? 'Copied!' : 'Copy Citation'}
                        </button>
                    </div>
                )}
            </article>
        </div>
    );
}

export default function Publications() {
    return (
        <div className="section animate-fade-in">
            <h2>Publications</h2>
            {publicationsData.map((pub, index) => (
                <div key={index} className="card">
                    <div className="card-title">
                        <Link to={`/publications/${pub.slug}`}>
                            {pub.title}
                        </Link>
                    </div>
                    <div className="card-meta">{pub.year}</div>
                </div>
            ))}
        </div>
    );
}
