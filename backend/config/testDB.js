// import { query } from './db.js';

// (async () => {
//     try {
//         const res = await query('SELECT NOW()');
//         console.log('Database Connected: ', res.rows[0]);
//         process.exit();
//     }
//     catch(err){
//         console.error('Database connection error:', err);
//         process.exit(1);
//     }
// })();

import pool from "./db.js";

const testConnection = async () => {
    try {
      const res = await pool.query('SELECT NOW()');
      console.log('Database connected:', res.rows[0]);
    } catch (err) {
      console.error('Connection error:', err);
    }
  };

  testConnection();