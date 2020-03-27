var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'classmysql.engr.oregonstate.edu',
  user            : 'cs340_nguydian',
  password        : '7408',
  database        : 'cs340_nguydian',
  // host            : 'us-cdbr-iron-east-04.cleardb.net',
  // user            : 'b958413ff9a5ad',
  // password        : 'edfa40d9',
  // database        : 'heroku_30ffccaec8e3a1a',
  multipleStatements: true
});

module.exports.pool = pool;
