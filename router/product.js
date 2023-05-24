const express = require("express");
const routerProduct = express.Router();
const con = require("../db/db");

routerProduct.get("/", (req, res) => {
  con.query("SELECT * FROM tbproduto"),
    (erroComandoSQL, result, fields) => {
      if (erroComandoSQL) {
        throw erroComandoSQL;
      }
      res.status(200).send(result);
    };
});

routerProduct.get("/:id", (req, res) => {
  const coProduto = req.params.id;
  con.query(
    "SELECT * FROM tbproduto WHERE coProduto = ?",
    [coProduto],
    (erroComandoSQL, result, fields) => {
      if (erroComandoSQL) {
        throw erroComandoSQL;
      }

      if (result.length > 0) {
        res.status(200).send(result);
      } else {
        res.status(404).send("Não encontrado");
      }
    }
  );
});

routerProduct.post("/", (req, res) => {
  const coProduto = req.body.coProduto;
  const noProduto = req.body.noautor;
  const qtProduto = req.body.qtproduto;
  const vlproduto = req.body.vlproduto;
  const vcproduto = req.body.vcproduto;

  const sql =
    "INSERT INTO tbproduto (coproduto, noproduto, qtproduto, vlproduto, vcproduto) VALUES (?, ?, ?, ?, ?)";
  con.query(
    sql,
    [coProduto, noProduto, qtProduto, vlproduto, vcproduto],
    (err, result, fields) => {
      if (err) {
        throw err;
      }
      if (result.affectedRows > 0) {
        res.status(200).send("Registro incluido com sucesso");
      } else {
        res.status(400).send("Erro ao incluir o registro");
      }
    }
  );
});

/* routerProduct.put("/:id", (req, res) => {
  const coProduto = req.body.id;
  const noProduto = req.body.noautor;
  const qtProduto = req.body.qtproduto;
  const vlproduto = req.body.vlproduto;
  const vcproduto = req.body.vcproduto;

  const sql =
    "UPDATE tbproduto SET NoAutor = ?, IdNacionalidade = ? WHERE IdAutor = ?";
  con.query(sql, [noautor, idnacionalidade, idautor], (erroUpdate, result) => {
    if (erroUpdate) {
      throw erroUpdate;
    }
    if (result.affectedRows > 0) {
      res.status(200).send("Registro alterado com sucesso");
    } else {
      res.status(404).send("Registro não encontrado");
    }
  });
}); */

routerProduct.delete("/:id", (req, res) => {
  const coProduto = req.params.id;
  const sql = "DELETE FROM tbproduto WHERE IdAutor = ?";

  con.query(sql, [coProduto], (err, result, fields) => {
    if (err) {
      throw err;
    }
    if (result.affectedRows > 0) {
      res.status(200).send("Registro excluido com sucesso");
    } else {
      res.status(404).send("Não encontrado");
    }
  });
});

module.exports = routerProduct;
