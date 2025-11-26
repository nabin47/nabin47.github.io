import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import publicationsData from '../data/publications.json';

export function PublicationView() {
    const { slug } = useParams();
    const [content, setContent] = useState('');
    const [publication, setPublication] = useState(null);

    useEffect(() => {
        const pub = publicationsData.find(p => p.slug === slug);
        setPublication(pub);

        if (pub && pub.content) {
            fetch(`/content/publications/${pub.content}`)
                .then(res => res.text())
                .then(text => setContent(text))
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
                <h1>{publication.title}</h1>
                <div className="card-meta" style={{ marginBottom: '2rem' }}>{publication.year}</div>
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
