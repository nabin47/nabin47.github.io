import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import publicationsData from '../data/publications.json';

import matter from 'gray-matter';

export function PublicationView() {
    const { slug } = useParams();
    const [content, setContent] = useState('');
    const [metadata, setMetadata] = useState(null);
    const [publication, setPublication] = useState(null);

    useEffect(() => {
        const pub = publicationsData.find(p => p.slug === slug);
        setPublication(pub);

        if (pub && pub.content) {
            fetch(`/content/publications/${pub.content}`)
                .then(res => res.text())
                .then(text => {
                    const { data, content } = matter(text);
                    setMetadata(data);
                    setContent(content);
                })
                .catch(err => console.error(err));
        }
    }, [slug]);

    if (!publication) return <div>Loading...</div>;

    return (
        <div className="section animate-fade-in">
            <Link to="/publications" className="btn" style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <ArrowLeft size={16} /> Back to Publications
            </Link>
            <article className="markdown-content">
                <h1>{metadata?.title || publication.title}</h1>
                <div className="card-meta" style={{ marginBottom: '1rem' }}>
                    {metadata?.date ? new Date(metadata.date).getFullYear() : publication.year}
                    {metadata?.venue && <span> | {metadata.venue}</span>}
                </div>

                {metadata?.citation && (
                    <div style={{ backgroundColor: 'var(--code-bg)', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
                        <strong>Citation:</strong> {metadata.citation}
                    </div>
                )}

                {metadata?.paperurl && (
                    <div style={{ marginBottom: '1.5rem' }}>
                        <a href={metadata.paperurl} target="_blank" rel="noopener noreferrer" className="btn">Download Paper</a>
                    </div>
                )}

                <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
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
