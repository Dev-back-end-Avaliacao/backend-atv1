const express = require('express');
const mysql = require('mysql2');
const jwt = require('jsonwebtoken');

const app = express();
const port = 3000
app.use(express.json());

// Conexão com o banco de dados
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'dbprodutos',
});

app.get('/', (req, res) => {
    res.send('Hello World!')
  })


// Inicia o servidor
app.listen(port, () => {
    console.log(`Servidor iniciado na porta ${port}`)
  })