const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { verifyToken, authorize } = require('../utils/authMiddleware');
const db = require('../database/db');

// Reuse registration logic but force role to 'official'
router.post('/create-official', verifyToken, authorize(['admin']), (req, res) => {
    req.body.role = 'official';
    authController.register(req, res);
});

// Admin Stats
router.get('/stats/users', verifyToken, authorize(['admin']), (req, res) => {
    const query = `
        SELECT u.id, u.name, u.email, COUNT(r.id) as reportCount 
        FROM Users u
        LEFT JOIN Reports r ON u.id = r.userId
        WHERE u.role = 'user'
        GROUP BY u.id
    `;
    db.all(query, [], (err, rows) => {
        if (err) return res.status(500).json({ message: err.message });
        res.json(rows);
    });
});

router.get('/stats/officials', verifyToken, authorize(['admin']), (req, res) => {
    const query = `
        SELECT u.id, u.name, u.email, COUNT(r.id) as reviewCount 
        FROM Users u
        LEFT JOIN Reports r ON u.id = r.reviewedBy
        WHERE u.role = 'official'
        GROUP BY u.id
    `;
    db.all(query, [], (err, rows) => {
        if (err) return res.status(500).json({ message: err.message });
        res.json(rows);
    });
});

module.exports = router;
