require('dotenv').config();

const ms = require("mysql2/promise");
const msPool = ms.createPool({
    host: process.env.HOST,
    user: process.env.USER, 
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
});

module.exports = msPool;