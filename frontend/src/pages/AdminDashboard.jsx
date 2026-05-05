import React, { useState, useEffect } from 'react';
import API from '../services/api';

const AdminDashboard = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [message, setMessage] = useState('');
    const [stats, setStats] = useState({ users: [], officials: [] });
    const [loading, setLoading] = useState(true);

    const fetchStats = async () => {
        try {
            const [usersRes, officialsRes] = await Promise.all([
                API.get('/admin/stats/users'),
                API.get('/admin/stats/officials')
            ]);
            setStats({ users: usersRes.data, officials: officialsRes.data });
        } catch (err) {
            console.error('Failed to fetch stats', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStats();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await API.post('/admin/create-official', formData);
            setMessage('Official account created successfully!');
            setFormData({ name: '', email: '', password: '' });
            fetchStats(); // Refresh stats
        } catch (err) {
            setMessage(err.response?.data?.message || 'Creation failed');
        }
    };

    return (
        <div className="container">
            <h1 style={{ marginBottom: '2rem' }}>Admin Control Center</h1>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem' }}>
                {/* Left Side: Create Official Form */}
                <div className="card" style={{ height: 'fit-content' }}>
                    <h2 style={{ marginBottom: '1.5rem' }}>Create Official</h2>
                    {message && <p style={{ color: 'var(--primary)', marginBottom: '1rem' }}>{message}</p>}
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Name</label>
                            <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required />
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} required />
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} required />
                        </div>
                        <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Create Account</button>
                    </form>
                </div>

                {/* Right Side: Stats Tables */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    {/* Officials Stats */}
                    <div className="card">
                        <h2 style={{ marginBottom: '1rem' }}>Officials & Performance</h2>
                        <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>List of traffic authorities and their verification counts.</p>
                        <table style={{ width: '100%', borderCollapse: 'collapse', color: 'var(--text-main)' }}>
                            <thead>
                                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', textAlign: 'left' }}>
                                    <th style={{ padding: '1rem' }}>ID</th>
                                    <th style={{ padding: '1rem' }}>Name</th>
                                    <th style={{ padding: '1rem' }}>Email</th>
                                    <th style={{ padding: '1rem', textAlign: 'center' }}>Reports Verified</th>
                                </tr>
                            </thead>
                            <tbody>
                                {stats.officials.map(off => (
                                    <tr key={off.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                        <td style={{ padding: '1rem' }}>#{off.id}</td>
                                        <td style={{ padding: '1rem' }}>{off.name}</td>
                                        <td style={{ padding: '1rem' }}>{off.email}</td>
                                        <td style={{ padding: '1rem', textAlign: 'center' }}>
                                            <span className="status-badge status-approved">{off.reviewCount}</span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Users Stats */}
                    <div className="card">
                        <h2 style={{ marginBottom: '1rem' }}>Citizens Activity</h2>
                        <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>List of registered users and their violation report counts.</p>
                        <table style={{ width: '100%', borderCollapse: 'collapse', color: 'var(--text-main)' }}>
                            <thead>
                                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', textAlign: 'left' }}>
                                    <th style={{ padding: '1rem' }}>ID</th>
                                    <th style={{ padding: '1rem' }}>Name</th>
                                    <th style={{ padding: '1rem' }}>Email</th>
                                    <th style={{ padding: '1rem', textAlign: 'center' }}>Total Reports</th>
                                </tr>
                            </thead>
                            <tbody>
                                {stats.users.map(user => (
                                    <tr key={user.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                        <td style={{ padding: '1rem' }}>#{user.id}</td>
                                        <td style={{ padding: '1rem' }}>{user.name}</td>
                                        <td style={{ padding: '1rem' }}>{user.email}</td>
                                        <td style={{ padding: '1rem', textAlign: 'center' }}>
                                            <span className="status-badge status-pending">{user.reportCount}</span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
