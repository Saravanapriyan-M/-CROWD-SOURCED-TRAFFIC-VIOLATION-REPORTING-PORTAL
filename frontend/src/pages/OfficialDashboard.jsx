import React, { useEffect, useState } from 'react';
import API from '../services/api';
import ReportCard from '../components/ReportCard';

const OfficialDashboard = () => {
    const [reports, setReports] = useState([]);

    const fetchReports = async () => {
        try {
            const { data } = await API.get('/report/all');
            setReports(data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchReports();
    }, []);

    const handleVerify = async (reportId, status) => {
        try {
            await API.put('/report/verify', { reportId, status });
            fetchReports();
        } catch (err) {
            alert('Verification failed');
        }
    };

    return (
        <div className="container">
            <h1 style={{ marginBottom: '2rem' }}>Official Review Dashboard</h1>
            <div className="report-grid">
                {reports.map((report) => (
                    <ReportCard key={report.id} report={report} onVerify={handleVerify} />
                ))}
            </div>
        </div>
    );
};

export default OfficialDashboard;
