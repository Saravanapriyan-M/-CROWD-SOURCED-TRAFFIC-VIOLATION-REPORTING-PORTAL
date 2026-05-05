const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const reportController = require('../controllers/reportController');
const { verifyToken, authorize } = require('../utils/authMiddleware');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

router.post('/upload', verifyToken, authorize(['user']), upload.single('image'), reportController.uploadReport);
router.get('/all', verifyToken, authorize(['official', 'admin']), reportController.getAllReports);
router.get('/my-reports', verifyToken, authorize(['user']), reportController.getUserReports);
router.put('/verify', verifyToken, authorize(['official']), reportController.verifyReport);

module.exports = router;
