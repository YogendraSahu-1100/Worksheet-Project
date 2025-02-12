const mysql = require("mysql2/promise");

async function connectDB() {
    try {
        const db = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB_NAME,
            port: process.env.DB_PORT
        });
        console.log("✅ Connected to MariaDB!");
        return db;
    } catch (err) {
        console.error("❌ Database Error:", err);
        throw err;
    }
}

module.exports = { connectDB };
