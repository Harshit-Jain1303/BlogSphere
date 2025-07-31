import React, { useState } from 'react';
import axios from 'axios';

const EditProfile = () => {
    const [file, setFile] = useState(null);
    const token = localStorage.getItem('token');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) return;

        const formData = new FormData();
        formData.append('profilePic', file);

        try {
            const res = await axios.post(
                'http://localhost:5000/api/users/upload-profile-pic',
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: token,
                    }
                }
            );
            alert('Profile picture updated!');
        } catch (err) {
            console.error(err);
            alert('Upload failed.');
        }
    };

    return (
        <div>
            <h2>Edit Profile</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setFile(e.target.files[0])}
                />
                <button type="submit">Upload</button>
            </form>
        </div>
    );
};

export default EditProfile;
