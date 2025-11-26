import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import postsData from '../data/posts.json';

export function BlogPost() {
    const { slug } = useParams();
    const [content, setContent] = useState('');

    useEffect(() => {
        fetch(`/posts/${slug}.md`)
            .then(res => res.text())
            .then(text => setContent(text))
            .catch(err => console.error(err));
    }, [slug]);

    return (
        <div className="section animate-fade-in">
            <Link to="/blog" className="btn" style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <ArrowLeft size={16} /> Back to Blog
            </Link>
            <article className="markdown-content">
                <ReactMarkdown>{content}</ReactMarkdown>
            </article>
        </div>
    );
}

export default function Blog() {
    return (
        <div className="section animate-fade-in">
            <h2>Blog Posts</h2>
            {postsData.map((post, index) => (
                <div key={index} className="card">
                    <div className="card-title">
                        <Link to={`/blog/${post.slug}`}>
                            {post.title}
                        </Link>
                    </div>
                    <div className="card-meta">{post.date}</div>
                    <p className="card-desc">{post.summary}</p>
                </div>
            ))}
        </div>
    );
}
