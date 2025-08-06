const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

const userRoutes = require('./routes/userRoutes');
const blogRoutes = require('./routes/blogRoutes');

console.log('userRoutes is:', typeof userRoutes);

app.use('/api/users', userRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/uploads', express.static('uploads'));


mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

app.get('/', (req, res) => {
    res.send('BlogSphere API is running');
});

app.listen(PORT, () => {
    console.log('Server running on port ${PORT}');
});