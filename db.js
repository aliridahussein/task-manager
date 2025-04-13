const { Pool } = require('pg');

// Update these values with your actual PostgreSQL credentials
const pool = new Pool({
  user: 'postgres',           // default user is usually 'postgres'
  host: 'localhost',          // if running PostgreSQL locally
  database: 'taskdb',         // the DB you created earlier
  password: 'P@ssw0rd',   // the password you set during install
  port: 5432,                 // default PostgreSQL port
});

module.exports = pool;
