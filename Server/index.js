const express = require("express");
require("dotenv").config();

const SPORT = process.env.SPORT;
const { db } = require("../DB/index.js");
const { getProducts, getProductById, getStylesByProductId, getRelatedByProductId } = require("../DB/models.js");

const app = express();

app.use(express.json());

app.get("/products", (req, res) => {
  console.log('/products called')
  getProducts(req.query.page, req.query.count)
    .then((results) => res.status(200).send(results))
    .catch((err) => {
      res.sendStatus(500);
    });
});

app.get("/products/:productId", (req, res) => {
  getProductById(req.params.productId)
    .then((results) => res.status(200).send(results[0].result))
    .catch((err) => {
      res.sendStatus(500);
    });
});

app.get("/products/:productId/styles", (req, res) => {
  getStylesByProductId(req.params.productId)
  .then((results) => res.status(200).send(results[0].result))
  .catch((err) => {
    res.sendStatus(500);
  });
});

app.get("/products/:productId/related", (req, res) => {
  getRelatedByProductId(req.params.productId)
  .then((results) => res.status(200).send(results[0].result))
  .catch((err) => {
    res.sendStatus(500);
  });
});

app.listen(SPORT, () => {
  console.log(`server running at http://localhost:${SPORT}`);
});
