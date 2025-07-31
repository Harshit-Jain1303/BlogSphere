// import { useState } from 'react';
// import API from '../../utils/api';
// import { useNavigate } from 'react-router-dom';

// function Login() {
//     const navigate = useNavigate();
//     const [formData, setFormData] = useState({
//         email: '',
//         password: '',
//     });

//     const handleChange = (e) =>
//         setFormData({ ...formData, [e.target.name]: e.target.value });

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const res = await API.post('/api/users/login', formData);
//             localStorage.setItem('token', res.data.token);
//             alert('Login successful');
//             navigate('/dashboard');
//         } catch (err) {
//             alert(err.response?.data?.msg || 'Login failed');
//         }
//     };

//     return (
//         <form onSubmit={handleSubmit}>
//             <h2>Login</h2>
//             <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
//             <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
//             <button type="submit">Login</button>
//         </form>
//     );
// }

// export default Login;

import { useState } from 'react';
import '../../assets/styles/Login.css'; // Import the CSS file
import API from '../../utils/api';
import { useNavigate, Link } from 'react-router-dom';

function Login() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const res = await API.post('/api/users/login', formData);
            localStorage.setItem('token', res.data.token);
            alert('Login successful');
            navigate('/dashboard');
        } catch (err) {
            alert(err.response?.data?.msg || 'Login failed');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit} className="login-form">
                <div className="login-header">
                    <h2 className="login-title">Welcome Back</h2>
                    <p className="login-subtitle">Sign in to your BlogSphere account</p>
                </div>

                <div className="login-welcome">
                    <p className="login-welcome-text">Ready to continue your blogging journey?</p>
                </div>

                <div className="login-fields">
                    <div className="login-field">
                        <label className="login-label">Email</label>
                        <input
                            name="email"
                            type="email"
                            placeholder="Enter your email"
                            onChange={handleChange}
                            className="login-input"
                            required
                        />
                    </div>

                    <div className="login-field">
                        <label className="login-label">Password</label>
                        <input
                            name="password"
                            type="password"
                            placeholder="Enter your password"
                            onChange={handleChange}
                            className="login-input"
                            required
                        />
                    </div>
                </div>

                <div className="login-forgot">
                    <a href="#" className="login-forgot-link">Forgot password?</a>
                </div>

                <button
                    type="submit"
                    className={`login-submit ${isLoading ? 'loading' : ''}`}
                    disabled={isLoading}
                >
                    {isLoading ? '' : 'Sign In'}
                </button>

                <div className="login-footer">
                    <p className="login-footer-text">Don't have an account?</p>
                    <Link to="/register" className="login-register-link">Create Account</Link>
                </div>
            </form>
        </div>
    );
}

export default Login;