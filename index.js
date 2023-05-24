const express = require("express");
const mysql = require("mysql2");
const jwt = require("jsonwebtoken");
const app = express();
const defaultRoute = require("./router/defaultRoute");
const routerProduct = require("./router/product");
const routerLogin = require("./router/login");
const port = 3000;
require("dotenv").config();

app.use(express.json());
app.use("/", defaultRoute);
app.use("/product", routerProduct);
app.use("/login", routerLogin);

// Inicia o servidor
app.listen(port, () => {
  console.log(`Sucess running services port ${port}`);
});
