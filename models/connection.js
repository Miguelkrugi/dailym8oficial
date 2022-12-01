var pg = require('pg');
const connectionString = "postgres://postgres:tftprojeto@localhost:5432/dailym8nodejs"
const Pool = pg.Pool
const pool = new Pool({
 connectionString,
 max: 10,
 ssl: {
 require: true,
 rejectUnauthorized: false
 }
})
module.exports = pool;