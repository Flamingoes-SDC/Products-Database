const express = require('express');
require('dotenv').config();

const SPORT = process.env.SPORT;
const {db} = require('../DB/index.js');

const app = express();

app.use(express.json());

app.get('/products', (req, res) => {
  db.query('SELECT * FROM product WHERE id = 150')
  .then((results) => res.send(results))
  .catch(err => console.log(err));
})

app.listen(SPORT, () => {
  console.log(`server running at http://localhost:${SPORT}`);
});