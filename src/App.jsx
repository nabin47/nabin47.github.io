import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import Publications, { PublicationView } from './pages/Publications';
import Experience from './pages/Experience';
import Blog, { BlogPost } from './pages/Blog';

function App() {
    return (
        <ThemeProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<Home />} />
                        <Route path="publications" element={<Publications />} />
                        <Route path="publications/:slug" element={<PublicationView />} />
                        <Route path="experience" element={<Experience />} />
                        <Route path="blog" element={<Blog />} />
                        <Route path="blog/:slug" element={<BlogPost />} />
                        <Route path="*" element={<Navigate to="/" replace />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;
