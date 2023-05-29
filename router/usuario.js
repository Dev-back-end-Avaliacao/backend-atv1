const express = require("express");
const routerUsuario = express.Router();
const jwt = require("jsonwebtoken");
const con = require("../db/db");
const login = require("./login");
require("dotenv").config();


routerUsuario.get("/", login.verificarToken, (req, res) => {
  con.query("SELECT * FROM tbusuario", (erroComandoSQL, result, fields) => {
    if (erroComandoSQL) {
      throw erroComandoSQL;
    }
    res.status(200).send(result);
  });
});

routerUsuario.get("/:id", login.verificarToken, (req, res) => {
  const coUsuario = req.params.id;
  con.query(
    "SELECT * FROM tbusuario WHERE coUsuario = ?",
    [coUsuario],
    (erroComandoSQL, result, fields) => {
      if (erroComandoSQL) {
        console.error("Erro na consulta SQL:", erroComandoSQL);
        res.status(500).send("Erro na consulta SQL");
        return;
      }
      res.json(result);
    }
  );
});

routerUsuario.post("/", (req, res) => {
  const coUsuario = req.body.coUsuario;
  const noUsuario = req.body.noUsuario;
  const txEmail = req.body.txEmail;
  const nuSenha = req.body.nuSenha;

  const sql =
    "INSERT INTO tbusuario (cousuario, nousuario, txemail, nusenha) VALUES (?, ?, ?, ?)";
  con.query(
    sql,
    [coUsuario, noUsuario, txEmail, nuSenha],
    (err, result, fields) => {
      if (err) {
        throw err;
      }
      if (result.affectedRows > 0) {
        res.status(200).send("Usuário incluído com sucesso");
      } else {
        res.status(400).send("Erro ao incluir o usuário");
      }
    }
  );
});

routerUsuario.put("/:id", login.verificarToken, (req, res) => {
  const coUsuario = req.params.id;
  const noUsuario = req.body.noUsuario;
  const txEmail = req.body.txEmail;
  const nuSenha = req.body.nuSenha;

  const sql =
    "UPDATE tbusuario SET noUsuario = ?, txEmail = ?, nuSenha = ? WHERE coUsuario = ?";
  con.query(
    sql,
    [noUsuario, txEmail, nuSenha, coUsuario],
    (err, result) => {
      if (err) {
        console.error("Erro ao atualizar o usuário:", err);
        res.status(500).send("Erro ao atualizar o usuário");
        return;
      }
      if (result.affectedRows > 0) {
        res.status(200).send("Usuário alterado com sucesso");
      } else {
        res.status(404).send("Usuário não encontrado");
      }
    }
  );
});

routerUsuario.delete("/:id", login.verificarToken, (req, res) => {
  const coUsuario = req.params.id;
  const sql = "DELETE FROM tbusuario WHERE coUsuario = ?";
  con.query(sql, [coUsuario], (err, result, fields) => {
    if (err) {
      console.error("Erro ao excluir o usuário:", err);
      res.status(500).send("Erro ao excluir o usuário");
      return;
    }
    if (result.affectedRows > 0) {
      res.status(200).send("Usuário excluído com sucesso");
    } else {
      res.status(404).send("Usuário não encontrado");
    }
  });
});

module.exports = routerUsuario;
