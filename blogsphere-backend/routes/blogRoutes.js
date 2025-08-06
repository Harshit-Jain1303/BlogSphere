// routes/blogRoutes.js
const express = require('express');
const Blog = require('../models/Blog');
const auth = require('../middleware/auth');
const router = express.Router();

// Create a blog
router.post('/', auth, async (req, res) => {
    const { title, content } = req.body;

    try {
        const newBlog = new Blog({
            title,
            content,
            author: req.user
        });

        const savedBlog = await newBlog.save();
        res.status(201).json(savedBlog);
    } catch (err) {
        res.status(500).json({ msg: 'Failed to create blog' });
    }
});

// Get all blogs
router.get('/', async (req, res) => {
    try {
        const blogs = await Blog.find().populate('author', 'username email profilePic');
        res.json(blogs);
    } catch (err) {
        res.status(500).json({ msg: 'Failed to fetch blogs' });
    }
});
// Get blogs by logged-in user
router.get('/my', auth, async (req, res) => {
    try {
        const blogs = await Blog.find({ author: req.user }).populate('author', 'username email profilePic');
        console.log("Blogs found:", blogs);
        res.json(blogs);
    } catch (err) {
        res.status(500).json({ msg: 'Failed to fetch your blogs' });
    }
});

// Get blog by ID
router.get('/:id', async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id).populate('author', 'username email profilePic');
        if (!blog) return res.status(404).json({ msg: 'Blog not found' });
        res.json(blog);
    } catch (err) {
        res.status(500).json({ msg: 'Failed to fetch blog' });
    }
});



// Update blog
router.put('/:id', auth, async (req, res) => {
    const { title, content } = req.body;

    try {
        const blog = await Blog.findById(req.params.id);

        if (!blog) return res.status(404).json({ msg: 'Blog not found' });
        if (blog.author.toString() !== req.user)
            return res.status(403).json({ msg: 'Unauthorized' });

        blog.title = title;
        blog.content = content;

        const updatedBlog = await blog.save();
        res.json(updatedBlog);
    } catch (err) {
        res.status(500).json({ msg: 'Failed to update blog' });
    }
});

// Delete blog
router.delete('/:id', auth, async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);

        if (!blog) return res.status(404).json({ msg: 'Blog not found' });
        if (blog.author.toString() !== req.user)
            return res.status(403).json({ msg: 'Unauthorized' });

        await blog.deleteOne();
        res.json({ msg: 'Blog deleted' });
    } catch (err) {
        res.status(500).json({ msg: 'Failed to delete blog' });
    }
});

module.exports = router;
