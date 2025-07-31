// import { Link, useNavigate } from 'react-router-dom';

// function Navbar() {
//     const navigate = useNavigate();
//     const token = localStorage.getItem('token');

//     const handleLogout = () => {
//         localStorage.removeItem('token');
//         navigate('/login');
//     };

//     return (
//         <nav style={{ display: 'flex', gap: '1rem', padding: '1rem' }}>
//             <Link to="/">Home</Link>
//             {token ? (
//                 <>
//                     <Link to="/dashboard">Dashboard</Link>
//                     <Link to="/create">New Blog</Link>
//                     <button onClick={handleLogout}>Logout</button>
//                 </>
//             ) : (
//                 <>
//                     <Link to="/register">Register</Link>
//                     <Link to="/login">Login</Link>
//                 </>
//             )}
//         </nav>
//     );
// }

// export default Navbar;

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../assets/styles/Navbar.css';

function NavBar() {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <nav className="navbar">
            <div className="navbar-content">
                <div className="navbar-brand">
                    <Link to="/" className="navbar-logo">BlogSphere</Link>
                </div>

                <div className={`navbar-nav ${mobileMenuOpen ? 'mobile-open' : ''}`}>
                    <Link to="/" className="navbar-link">Home</Link>
                    {token ? (
                        <>
                            <Link to="/dashboard" className="navbar-link">Dashboard</Link>
                            <Link to="/create" className="navbar-link primary">Create Blog</Link>
                            <button onClick={handleLogout} className="navbar-logout">Logout</button>
                        </>
                    ) : (
                        <>
                            <Link to="/register" className="navbar-link">Register</Link>
                            <Link to="/login" className="navbar-link">Login</Link>
                        </>
                    )}
                </div>

                <button
                    className="navbar-toggle"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    <span className="navbar-toggle-icon">☰</span>
                </button>
            </div>
        </nav>
    );
}

export default NavBar;
