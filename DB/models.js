const { db } = require ('./index.js');

const getProducts = (productId) => {
  db.query('SELECT * FROM product WHERE id = 150')
};

module.exports = {
  placeholder
}