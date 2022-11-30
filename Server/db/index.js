const { Pool } = require('pg');
const pool = new Pool({
  host: 'k2-infra-expense-manager.cs3idq0uvadc.ap-south-1.rds.amazonaws.com',
  user: 'postgres',
  database: 'postgres',
  password: 'k2infraexpensemanager',
  port: 5432,
});

module.exports = pool;
