const { db } = require ('./index.js');

const getProducts = (pageReq, countReq) => {
  let page = pageReq || 1;
  let count = countReq || 5;
  let offSet = (page * count) - count;

  return db.query(`SELECT * FROM product LIMIT $1 OFFSET $2`, [count, offSet]);
};

const getProductById = (productId) => {
  return db.query(
    `SELECT json_build_object(
    'id', pd.id,
    'name', pd.name,
    'slogan', pd.slogan,
    'description', pd.description,
    'category', pd.category,
    'default_price', pd.default_price,
    'features', (
        SELECT json_agg(json_build_object(
            'feature', f.feature,
            'value', f.value
            ))
        FROM features f WHERE f.product_id = pd.id
    )
) AS RESULT
FROM product pd
WHERE pd.id = $1;`, [productId]);
}

module.exports = {
  getProducts,
  getProductById
}