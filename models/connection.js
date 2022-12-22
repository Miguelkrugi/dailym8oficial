var pg = require('pg'); 
 
const connectionString = "postgres://lsiqflfccoyfjt:ca69c8a390dd18782a0378ac317515dbb55d5fd783833de0e88847998db01d1d@ec2-3-217-251-77.compute-1.amazonaws.com:5432/d41r51pav8k8tq" 
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