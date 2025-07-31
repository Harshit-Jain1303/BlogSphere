// src/pages/EditBlog.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function EditBlog() {
    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/blogs/${id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setTitle(res.data.title);
                setContent(res.data.content);
            } catch (err) {
                console.error('Failed to fetch blog:', err);
            }
        };

        fetchBlog();
    }, [id, token]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:5000/api/blogs/${id}`, {
                title,
                content,
            }, {
                headers: { Authorization: `Bearer ${token}` },
            });
            navigate('/dashboard');
        } catch (err) {
            console.error('Update failed:', err);
        }
    };

    return (
        <div>
            <h2>Edit Blog</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <br />
                <textarea
                    placeholder="Content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    rows="10"
                    required
                />
                <br />
                <button type="submit">Update Blog</button>
            </form>
        </div>
    );
}

export default EditBlog;
