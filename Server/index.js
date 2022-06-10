const express = require("express");
require("dotenv").config();

const SPORT = process.env.SPORT;
const { db } = require("../DB/index.js");
const { getProducts, getProductById } = require("../DB/models.js");

const app = express();

app.use(express.json());

app.get("/products", (req, res) => {
  getProducts(req.query.page, req.query.count)
    .then((results) => res.send(results))
    .catch((err) => {
      console.log(err);
      res.sendStatus(502);
    });
});

app.get("/products/:productId", (req, res) => {
  getProductById(req.params.productId)
    .then((results) => res.send(results))
    .catch((err) => {
      console.log(err);
      res.sendStatus(502);
    });
});

app.listen(SPORT, () => {
  console.log(`server running at http://localhost:${SPORT}`);
});
