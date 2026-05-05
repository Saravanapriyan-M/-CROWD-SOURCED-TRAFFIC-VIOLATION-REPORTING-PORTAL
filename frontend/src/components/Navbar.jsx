import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/login');
    };

    return (
        <nav className="navbar">
            <Link to="/" className="logo">Traffic Portal</Link>
            <div>
                {user ? (
                    <>
                        <span style={{ color: 'var(--text-muted)', marginRight: '1rem' }}>Welcome, {user.name}</span>
                        {user.role === 'user' && (
                            <>
                                <Link to="/dashboard">My Reports</Link>
                                <Link to="/upload">Upload Violation</Link>
                            </>
                        )}
                        {user.role === 'official' && <Link to="/official">Official Dashboard</Link>}
                        {user.role === 'admin' && <Link to="/admin">Admin Dashboard</Link>}
                        <button onClick={handleLogout} className="btn btn-primary" style={{ marginLeft: '1rem', padding: '0.5rem 1rem' }}>Logout</button>
                    </>
                ) : (
                    <>
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
