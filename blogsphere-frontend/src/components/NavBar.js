

import React, { useState } from 'react';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../assets/styles/Navbar.css';
import { isTokenExpired } from '../utils/auth';

function NavBar() {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token && isTokenExpired(token)) {
            localStorage.removeItem('token');
            console.log('happened');
            navigate('/login');
        }
    }, []);

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

// import React, { useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import '../assets/styles/Navbar.css';
// import { isTokenExpired } from '../utils/auth';

// function NavBar() {
//     const navigate = useNavigate();
//     const [token, setToken] = useState(localStorage.getItem('token'));
//     const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

//     useEffect(() => {
//         const currentToken = localStorage.getItem('token');
//         if (currentToken && isTokenExpired(currentToken)) {
//             localStorage.removeItem('token');
//             setToken(null);
//             navigate('/login');
//         }
//     }, [navigate]);

//     const handleLogout = () => {
//         localStorage.removeItem('token');
//         setToken(null);
//         navigate('/login');
//     };

//     // Optional: refresh token state when mobile menu toggled
//     useEffect(() => {
//         setToken(localStorage.getItem('token'));
//     }, [mobileMenuOpen]);

//     return (
//         <nav className="navbar">
//             <div className="navbar-content">
//                 <div className="navbar-brand">
//                     <Link to="/" className="navbar-logo">BlogSphere</Link>
//                 </div>

//                 <div className={`navbar-nav ${mobileMenuOpen ? 'mobile-open' : ''}`}>
//                     <Link to="/" className="navbar-link">Home</Link>
//                     {token ? (
//                         <>
//                             <Link to="/dashboard" className="navbar-link">Dashboard</Link>
//                             <Link to="/create" className="navbar-link primary">Create Blog</Link>
//                             <button onClick={handleLogout} className="navbar-logout">Logout</button>
//                         </>
//                     ) : (
//                         <>
//                             <Link to="/register" className="navbar-link">Register</Link>
//                             <Link to="/login" className="navbar-link">Login</Link>
//                         </>
//                     )}
//                 </div>

//                 <button
//                     className="navbar-toggle"
//                     onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//                 >
//                     <span className="navbar-toggle-icon">☰</span>
//                 </button>
//             </div>
//         </nav>
//     );
// }

// export default NavBar;
