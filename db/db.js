const mysql = require("mysql2");

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "dbprodutos",
});

con.connect((err) => {
  if (err) {
    throw err;
  }
});

module.exports = con;
