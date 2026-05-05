import React, { useEffect, useState } from 'react';
import API from '../services/api';
import ReportCard from '../components/ReportCard';
import { Link } from 'react-router-dom';

const UserDashboard = () => {
    const [reports, setReports] = useState([]);

    useEffect(() => {
        const fetchReports = async () => {
            try {
                const { data } = await API.get('/report/my-reports');
                setReports(data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchReports();
    }, []);

    return (
        <div className="container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h1>My Submitted Reports</h1>
                <Link to="/upload" className="btn btn-primary">Report New Violation</Link>
            </div>
            
            {reports.length === 0 ? (
                <div className="card" style={{ textAlign: 'center', padding: '4rem' }}>
                    <p style={{ color: 'var(--text-muted)' }}>You haven't submitted any reports yet.</p>
                </div>
            ) : (
                <div className="report-grid">
                    {reports.map((report) => (
                        <ReportCard key={report.id} report={report} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default UserDashboard;
