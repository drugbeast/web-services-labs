const Pool = require('pg').Pool

const pool = new Pool({
    user: 'drugbeast',
    password: '1234',
    host:'localhost',
    port: 5432,
    database: 'clubs',
    ssl: false
})

module.exports = pool