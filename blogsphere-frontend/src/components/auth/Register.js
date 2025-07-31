// import { useState } from 'react';
// import API from '../../utils/api';
// import { useNavigate } from 'react-router-dom';

// function Register() {
//     const navigate = useNavigate();
//     const [formData, setFormData] = useState({
//         username: '',
//         email: '',
//         password: '',
//     });

//     const handleChange = (e) =>
//         setFormData({ ...formData, [e.target.name]: e.target.value });

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const res = await API.post('/api/users/register', formData);
//             alert('Registration successful. Please login.');
//             navigate('/login');
//         } catch (err) {
//             alert(err.response?.data?.msg || 'Registration failed');
//         }
//     };

//     return (
//         <form onSubmit={handleSubmit}>
//             <h2>Register</h2>
//             <input name="username" placeholder="Username" onChange={handleChange} required />
//             <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
//             <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
//             <button type="submit">Register</button>
//         </form>
//     );
// }

// export default Register;

import { useState } from 'react';
import '../../assets/styles/Register.css'; // Import the CSS file
import API from '../../utils/api';
import { useNavigate, Link } from 'react-router-dom';

function Register() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });

    const handleChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const res = await API.post('/api/users/register', formData);
            alert('Registration successful. Please login.');
            navigate('/login');
        } catch (err) {
            alert(err.response?.data?.msg || 'Registration failed');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="register-container">
            <form onSubmit={handleSubmit} className="register-form">
                <div className="register-header">
                    <h2 className="register-title">Join BlogSphere</h2>
                    <p className="register-subtitle">Create your account to start blogging</p>
                </div>

                <div className="register-fields">
                    <div className="register-field">
                        <label className="register-label">Username</label>
                        <input
                            name="username"
                            placeholder="Enter your username"
                            onChange={handleChange}
                            className="register-input"
                            required
                        />
                    </div>

                    <div className="register-field">
                        <label className="register-label">Email</label>
                        <input
                            name="email"
                            type="email"
                            placeholder="Enter your email"
                            onChange={handleChange}
                            className="register-input"
                            required
                        />
                    </div>

                    <div className="register-field">
                        <label className="register-label">Password</label>
                        <input
                            name="password"
                            type="password"
                            placeholder="Create a password"
                            onChange={handleChange}
                            className="register-input"
                            required
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    className={`register-submit ${isLoading ? 'loading' : ''}`}
                    disabled={isLoading}
                >
                    {isLoading ? '' : 'Create Account'}
                </button>

                <div className="register-footer">
                    <p className="register-footer-text">Already have an account?</p>
                    <Link to="/login" className="register-login-link">Sign In</Link>
                </div>
            </form>
        </div>
    );
}

export default Register;
