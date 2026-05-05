const bcrypt = require('bcryptjs');
const db = require('./database/db');

async function seed() {
    const hashedPassword = await bcrypt.hash('admin123', 10);
    db.run(`INSERT OR IGNORE INTO Users (name, email, password, role) VALUES (?, ?, ?, ?)`, 
        ['Admin User', 'admin@example.com', hashedPassword, 'admin'], 
        function(err) {
            if (err) console.error(err.message);
            else console.log('Admin user seeded (or already exists)');
            process.exit();
        }
    );
}

seed();
