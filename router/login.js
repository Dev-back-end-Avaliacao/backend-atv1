const express = require("express");
const routerLogin = express.Router();
const jwt = require("jsonwebtoken");
const con = require("../db/db");
require("dotenv").config();


routerLogin.get("/", (req, res) => {
  res.send("Entre com seu e-mail e senha");
});


routerLogin.post('/', (req, res) => {
  const txEmail = req.body.txEmail;
  const nuSenha = req.body.nuSenha;
  const sql = 'SELECT * FROM tbusuario WHERE txEmail = ? AND nuSenha = ?';
  con.query(sql, [txEmail, nuSenha], (erroComandoSQL, result, fields) => {
    if (erroComandoSQL) {
      throw erroComandoSQL;
    } else {
      if (result.length > 0) {
        
        const token = jwt.sign({ txEmail, nuSenha }, process.env.SENHA, {
          expiresIn: 60 * 100,
        });
        res.json({ auth: true, token: token });
      } else {
        res.status(403).json({ message: 'Login inválido!' });
      }
    }
  });
});

function verificarToken(req, res, next) {
  const token = req.headers['x-access-token'];
  if (!token) {
    res.status(401).json({
      auth: false,
      message: 'Nenhum token de autenticação informado.',
    });
  } else {
    jwt.verify(token, process.env.SENHA, function (err, decoded) {
      if (err) {
        res.status(500).json({ auth: false, message: 'Token inválido.' });
      } else {
        console.log('Metodo acessado por ' + decoded.nome);
        next();
      }
    });
  }
}


  module.exports = routerLogin;
  module.exports.verificarToken = verificarToken;
