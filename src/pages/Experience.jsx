import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import experienceData from '../data/experience.json';

export default function Experience() {
    const [experiences, setExperiences] = useState([]);

    useEffect(() => {
        const fetchExperiences = async () => {
            const loadedExperiences = await Promise.all(
                experienceData.map(async (exp) => {
                    try {
                        const response = await fetch(`/content/experience/${exp.content}`);
                        const text = await response.text();
                        return text;
                    } catch (error) {
                        console.error('Error loading experience:', error);
                        return '';
                    }
                })
            );
            setExperiences(loadedExperiences);
        };

        fetchExperiences();
    }, []);

    return (
        <div className="section animate-fade-in">
            <h2>Experience & Teaching</h2>
            <div className="experience-list">
                {experiences.map((content, index) => (
                    <div key={index} className="card markdown-content">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
                    </div>
                ))}
            </div>
        </div>
    );
}
