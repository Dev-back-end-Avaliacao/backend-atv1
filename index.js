const express = require("express");
const app = express();
const mysql = require("mysql2");
const routerProdutos = require("./router/produtos");
const routerUsuario = require("./router/usuario");
const routerLogin = require("./router/login");
const port = 3000;
require("dotenv").config();


app.use(express.json());

app.use("/", routerLogin);
app.use("/produtos", routerProdutos);
app.use("/usuario", routerUsuario);
app.use("/login", routerLogin);

// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor ouvindo na porta ${port}`);
});
