const express = require("express");
const routerProdutos = express.Router();
const con = require("../db/db");
const login = require("./login");
require("dotenv").config();


routerProdutos.get("/", login.verificarToken, (req, res) => {
  con.query("SELECT * FROM tbproduto", (erroComandoSQL, result, fields) => {
    if (erroComandoSQL) {
      throw erroComandoSQL;
    }
    res.status(200).send(result);
  });
});

routerProdutos.get("/:id", login.verificarToken, (req, res) => {
  const coProduto = req.params.id;
  con.query(
    "SELECT * FROM tbproduto WHERE coProduto = ?",
    [coProduto],
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

routerProdutos.post("/", login.verificarToken, (req, res) => {
  const noProduto = req.body.noProduto;
  const qtProduto = req.body.qtProduto;
  const vlProduto = req.body.vlProduto;
  const vcProduto = req.body.vcProduto;

  const sql =
    "INSERT INTO tbproduto (noProduto, qtProduto, vlProduto, vcProduto) VALUES (?, ?, ?, ?)";
  con.query(
    sql,
    [noProduto, qtProduto, vlProduto, vcProduto],
    (err, result, fields) => {
      if (err) {
        throw err;
      }
      if (result.affectedRows > 0) {
        res.status(200).send("Registro incluído com sucesso");
      } else {
        res.status(400).send("Erro ao incluir o registro");
      }
    }
  );
});

routerProdutos.put("/:id", login.verificarToken, (req, res) => {
  const coProduto = req.params.id;
  const noProduto = req.body.noProduto;
  const qtProduto = req.body.qtProduto;
  const vlProduto = req.body.vlProduto;
  const vcProduto = req.body.vcProduto;

  const sql =
    "UPDATE tbproduto SET noProduto = ?, qtProduto = ?, vlProduto = ?, vcProduto = ? WHERE coProduto = ?";
  con.query(
    sql,
    [noProduto, qtProduto, vlProduto, vcProduto, coProduto],
    (err, result) => {
      if (err) {
        console.error("Erro ao atualizar o registro:", err);
        res.status(500).send("Erro ao atualizar o registro");
        return;
      }
      if (result.affectedRows > 0) {
        res.status(200).send("Registro alterado com sucesso");
      } else {
        res.status(404).send("Registro não encontrado");
      }
    }
  );
});

routerProdutos.delete("/:id", login.verificarToken, (req, res) => {
  const coProduto = req.params.id;
  const sql = "DELETE FROM tbproduto WHERE coProduto = ?";
  con.query(sql, [coProduto], (err, result, fields) => {
    if (err) {
      console.error("Erro ao excluir o registro:", err);
      res.status(500).send("Erro ao excluir o registro");
      return;
    }
    if (result.affectedRows > 0) {
      res.status(200).send("Registro excluído com sucesso");
    } else {
      res.status(404).send("Registro não encontrado");
    }
  });
});

module.exports = routerProdutos;
