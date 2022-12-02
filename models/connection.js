var pg = require('pg');
const connectionString = "postgres://postgres:tftprojeto@localhost:5432/dailym8nodejs"
const Pool = pg.Pool
//const pool = new Pool({
 //connectionString,
 //max: 10,
 //ssl: {
 //require: true,
 //rejectUnauthorized: false
 //}
//})

const pool = new Pool({
    //connectionString: process.env.DATABASE_URL || 'postgres://postgres:rFeZvIpl3lmOXfB@dailym8nodejs.internal:5432',
    connectionString: process.env.DATABASE_URL || 'postgres://postgres:tftprojeto@localhost:5432/dailym8nodejs',
    ssl: process.env.DATABASE_URL ? true : false
})
module.exports = pool;