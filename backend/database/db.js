const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'traffic.db');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error connecting to database:', err.message);
    } else {
        console.log('Connected to SQLite database.');
    }
});

// Ensure tables are created before any operations
db.serialize(() => {
    // Users table
    db.run(`CREATE TABLE IF NOT EXISTS Users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        role TEXT CHECK(role IN ('user', 'official', 'admin')) DEFAULT 'user'
    )`, (err) => {
        if (err) {
            console.error('Error creating Users table:', err.message);
        } else {
            console.log('Users table ready');
        }
    });

    // Reports table
    db.run(`CREATE TABLE IF NOT EXISTS Reports (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        userId INTEGER,
        image TEXT NOT NULL,
        description TEXT,
        location TEXT,
        status TEXT CHECK(status IN ('pending', 'approved', 'rejected')) DEFAULT 'pending',
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        reviewedBy INTEGER,
        FOREIGN KEY (userId) REFERENCES Users(id),
        FOREIGN KEY (reviewedBy) REFERENCES Users(id)
    )`, (err) => {
        if (err) {
            console.error('Error creating Reports table:', err.message);
        } else {
            console.log('Reports table ready');
        }
    });
});

module.exports = db;
