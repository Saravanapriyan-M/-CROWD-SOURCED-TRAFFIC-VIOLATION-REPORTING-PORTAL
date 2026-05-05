const db = require('../database/db');

exports.uploadReport = (req, res) => {
    const { description, location } = req.body;
    const userId = req.user.id;
    const image = req.file ? `/uploads/${req.file.filename}` : null;

    if (!image || !description || !location) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const query = `INSERT INTO Reports (userId, image, description, location) VALUES (?, ?, ?, ?)`;
    db.run(query, [userId, image, description, location], function(err) {
        if (err) return res.status(500).json({ message: err.message });
        res.status(201).json({ message: 'Report submitted successfully', reportId: this.lastID });
    });
};

exports.getAllReports = (req, res) => {
    const query = `SELECT Reports.*, Users.name as userName FROM Reports 
                   JOIN Users ON Reports.userId = Users.id 
                   ORDER BY Reports.createdAt DESC`;
    db.all(query, [], (err, rows) => {
        if (err) return res.status(500).json({ message: err.message });
        res.json(rows);
    });
};

exports.verifyReport = (req, res) => {
    const { reportId, status } = req.body;
    const reviewedBy = req.user.id;
    
    if (!['approved', 'rejected'].includes(status)) {
        return res.status(400).json({ message: 'Invalid status' });
    }

    const query = `UPDATE Reports SET status = ?, reviewedBy = ? WHERE id = ?`;
    db.run(query, [status, reviewedBy, reportId], function(err) {
        if (err) return res.status(500).json({ message: err.message });
        res.json({ message: `Report ${status} successfully` });
    });
};

exports.getUserReports = (req, res) => {
    const userId = req.user.id;
    const query = `SELECT * FROM Reports WHERE userId = ? ORDER BY createdAt DESC`;
    db.all(query, [userId], (err, rows) => {
        if (err) return res.status(500).json({ message: err.message });
        res.json(rows);
    });
};
