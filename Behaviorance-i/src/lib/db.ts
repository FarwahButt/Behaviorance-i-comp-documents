// import sql from 'mssql';

// const dbConfig: sql.config = {
//   user: process.env.DB_USER || '',
//   password: process.env.DB_PASSWORD || '',
//   server: process.env.DB_SERVER || '',
//   database: process.env.DB_DATABASE || '',
//   options: {
//     encrypt: false,
//     trustServerCertificate: true,
//   },
// };

// if (!dbConfig.user || !dbConfig.password || !dbConfig.server || !dbConfig.database) {
//   throw new Error("Missing SQL Server configuration. Check your .env.local file.");
// }

// const pool = new sql.ConnectionPool(dbConfig);
// const poolConnect = pool.connect();

// export { pool, poolConnect };

import sql, { ConnectionPool } from 'mssql';

const config: sql.config = {
  user: process.env.DB_USER as string,
  password: process.env.DB_PASS as string,
  server: process.env.DB_SERVER as string,
  database: process.env.DB_NAME as string,
  port: 1433,
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
};

let pool: ConnectionPool | null = null;

export const getConnection = async (): Promise<ConnectionPool> => {
  if (!pool) {
    try {
      pool = await sql.connect(config);
      console.log('✅ Connected to SQL Server');
    } catch (err) {
      console.error('❌ DB Connection Error:', err);
      throw err;
    }
  }
  return pool;
};
