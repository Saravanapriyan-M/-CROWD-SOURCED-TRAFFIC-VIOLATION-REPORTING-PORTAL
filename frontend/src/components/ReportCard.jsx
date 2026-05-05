import React from 'react';

const ReportCard = ({ report, onVerify }) => {
    return (
        <div className="card">
            <img 
                src={`http://localhost:5000${report.image}`} 
                alt="Violation" 
                style={{ width: '100%', borderRadius: '0.5rem', marginBottom: '1rem', height: '230px', objectFit: 'cover' }} 
            />
            <div style={{ marginBottom: '1rem' }}>
                <span className={`status-badge status-${report.status}`}>
                    {report.status}
                </span>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
                    {new Date(report.createdAt).toLocaleDateString()}
                </p>
            </div>
            <h3 style={{ marginBottom: '0.5rem' }}>{report.location}</h3>
            <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>{report.description}</p>
            
            {onVerify && report.status === 'pending' && (
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <button 
                        className="btn" 
                        style={{ backgroundColor: 'var(--status-approved)', color: 'white', flex: 1 }}
                        onClick={() => onVerify(report.id, 'approved')}
                    >
                        Approve
                    </button>
                    <button 
                        className="btn" 
                        style={{ backgroundColor: 'var(--status-rejected)', color: 'white', flex: 1 }}
                        onClick={() => onVerify(report.id, 'rejected')}
                    >
                        Reject
                    </button>
                </div>
            )}
            {report.userName && (
                <p style={{ marginTop: '1rem', fontSize: '0.875rem', color: 'var(--primary)' }}>
                    Reported by: {report.userName}
                </p>
            )}
        </div>
    );
};

export default ReportCard;
