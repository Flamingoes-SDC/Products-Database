const express = require('express');
require('dotenv').config();

const SPORT = process.env.SPORT;
const {db} = require('../DB/index.js');
const { getProducts } = require('../DB/models.js')

const app = express();

app.use(express.json());

app.get('/products', (req, res) => {
  getProducts()
  .then((results) => res.send(results))
  .catch(err => console.log(err));
})

app.listen(SPORT, () => {
  console.log(`server running at http://localhost:${SPORT}`);
});