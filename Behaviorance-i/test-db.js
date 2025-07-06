require('dotenv').config();
const sql = require('mssql');

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER || 'localhost',
  database: process.env.DB_DATABASE,
  port: parseInt(process.env.DB_PORT || '1433'),
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
};

(async () => {
  try {
    const pool = await sql.connect(config);
    console.log("✅ Connected to SQL Server");
    await pool.close();
  } catch (err) {
    console.error("❌ Failed to connect:", err);
  }
})();
