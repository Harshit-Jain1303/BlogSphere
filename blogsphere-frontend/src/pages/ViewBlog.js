// src/pages/ViewBlog.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';

function ViewBlog() {
    const { id } = useParams();
    const [blog, setBlog] = useState(null);

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/blogs/${id}`);
                setBlog(res.data);
            } catch (err) {
                console.error('Error fetching blog:', err);
            }
        };

        fetchBlog();
    }, [id]);

    if (!blog) return <div>Loading...</div>;

    return (
        <div>
            <h2>{blog.title}</h2>
            <p> <strong>Author:</strong>{' '}
                <Link to={`/author/${blog.author._id}`}>
                    {blog.author.username}
                </Link>
            </p>

            <p>{blog.content}</p>
        </div>
    );
}

export default ViewBlog;