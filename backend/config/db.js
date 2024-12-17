// import {Pool} from 'pg';
import pkg from 'pg';
import dotenv from 'dotenv';
const { Pool } = pkg;

// require('dotenv').config();

dotenv.config();

const pool = new Pool({
    host: process.env.PG_HOST,
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE,
});

export default pool;