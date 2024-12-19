const mysql = require('mysql2/promise');
require('dotenv').config();

const connection = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '@Chandu3Bhat', // Replace with your actual MySQL password
  database: 'new_college_events', // Your database name
});

module.exports = connection;
