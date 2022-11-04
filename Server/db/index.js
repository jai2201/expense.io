const { Pool } = require('pg');
const pool = new Pool({
  host: 'k2infra.cu4qp8cl7vna.ap-south-1.rds.amazonaws.com',
  user: 'postgres',
  database: 'k2infra',
  password: 'k2infrademopass',
  port: 5432,
});

module.exports = pool;
