import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
    user        : 'postgres',
    host        : 'localhost',
    database    : 'postgres',
    password    : 'Delaoserna2411',
    port        : 5432,
    max         : 100,
});

export default pool;