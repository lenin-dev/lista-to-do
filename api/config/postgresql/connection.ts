import pkg from 'pg';
import dotenv from 'dotenv';

const { Pool } = pkg;
dotenv.config();

const pool = new Pool({
    user        : process.env.DB_USER,
    host        : process.env.DB_HOST,
    database    : process.env.DB_DATABASE,
    password    : String(process.env.DB_PASSWORD),
    port        : 5432,
    max         : 100,
});

export default pool;