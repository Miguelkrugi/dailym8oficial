var pg = require('pg');
const connectionString = "postgres://postgres:tftprojeto@localhost:5432/dailym8nodejs"

//const connectionString = "postgres://dailym8database:LJMX8Mq8g14Lv2IVN7EFLD7zKFxXsgam@dpg-cef5npda499e21q1sdjg-a.oregon-postgres.render.com:5432/dailym8database_goe5"
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
  // connectionString: process.env.DATABASE_URL || 'postgres://dailym8database:LJMX8Mq8g14Lv2IVN7EFLD7zKFxXsgam@dpg-cef5npda499e21q1sdjg-a.oregon-postgres.render.com:5432/dailym8database_goe5',
    ssl: process.env.DATABASE_URL ? true : false
})
module.exports = pool;