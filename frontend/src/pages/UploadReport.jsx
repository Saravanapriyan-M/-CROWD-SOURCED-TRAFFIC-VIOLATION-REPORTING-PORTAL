import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';

const UploadReport = () => {
    const [formData, setFormData] = useState({ description: '', location: '' });
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const data = new FormData();
        data.append('image', image);
        data.append('description', formData.description);
        data.append('location', formData.location);

        try {
            await API.post('/report/upload', data);
            navigate('/dashboard');
        } catch (err) {
            alert('Upload failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container" style={{ maxWidth: '600px' }}>
            <div className="card">
                <h2 style={{ marginBottom: '1.5rem' }}>Report a Traffic Violation</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Violation Photo</label>
                        <input type="file" onChange={(e) => setImage(e.target.files[0])} accept="image/*" required />
                    </div>
                    <div className="form-group">
                        <label>Location</label>
                        <input type="text" placeholder="e.g. MG Road, Near City Mall" value={formData.location} 
                               onChange={(e) => setFormData({...formData, location: e.target.value})} required />
                    </div>
                    <div className="form-group">
                        <label>Description (Briefly describe the violation)</label>
                        <textarea rows="4" value={formData.description} 
                                  onChange={(e) => setFormData({...formData, description: e.target.value})} required />
                    </div>
                    <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={loading}>
                        {loading ? 'Submitting...' : 'Submit Report'}
                    </button>
                    <button type="button" onClick={() => navigate('/dashboard')} className="btn" style={{ width: '100%', marginTop: '1rem' }}>Cancel</button>
                </form>
            </div>
        </div>
    );
};

export default UploadReport;
