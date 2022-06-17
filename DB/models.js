const { db } = require ('./index.js');

const getProducts = (pageReq, countReq) => {
  let page = pageReq || 1;
  let count = countReq || 5;
  let offSet = (page * count) - count;

  return db.query(`SELECT * FROM product WHERE id > $2 LIMIT $1`, [count, offSet]);
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
};

const getStylesByProductId = (productId) => {
  return db.query(`
  SELECT json_build_object(
    'product_id', pd.id,
    'results', (SELECT json_agg ( json_build_object(
        'style_id', s.id,
        'name', s.name,
        'original_price', s.original_price,
        'sale_price', s.sale_price,
        'default?', s.default_style,
        'photos', (SELECT json_agg(
            json_build_object(
                'thumbnail_url', ph.thumbnail_url,
                'url', ph.url
                )
            )
        FROM photos AS ph WHERE "styleId" = s.id
        ),
        'SKU', (
            SELECT json_object_agg(
                sk.id, ( SELECT json_build_object(
                    'size', sk.size,
                    'quantity', sk.quantity
                )
                FROM skus WHERE "id" = sk.id )
           )
            FROM skus AS sk WHERE "styleId" = s.id
        )
        ))
    AS RESULT
    FROM styles s
    WHERE "product_Id" = pd.id
    )
) AS Result
FROM product pd
WHERE pd.id = $1;
  `, [productId]);
};

const getRelatedByProductId = (product_Id) => {
  return db.query(`
  SELECT json_agg(r.related_product_id)
  AS Result
  FROM related r WHERE current_product_id = $1;
  `, [product_Id]);
};

module.exports = {
  getProducts,
  getProductById,
  getStylesByProductId,
  getRelatedByProductId
}