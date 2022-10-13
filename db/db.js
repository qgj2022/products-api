// use the dotenv library to grab environmental variables from the .env file
require('dotenv').config();

// deconstruct the pool object from the pg library for postgresql
const { Pool } = require('pg');

// create the pool so we can create multiple clients
// use the environmental variables from the .env file
const pool = new Pool({
    host: process.env.HOST,
    port: process.env.PORT,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});

// return results for a single product
const searchOneProduct = (product_id) => {

    return pool.connect()
      .then((client) => {
        return client.query(`select json_build_object(
        'id', a.id,
        'name', a.name,
        'slogan', a.slogan,
        'description', a.description,
        'category', a.category,
        'default_price', a.default_price,
        'features', (
            select json_agg(json_build_object(
                'feature', f.feature,
                'value', f.value
            ))
        from features f where f.product_id = a.id
        )
        ) as result
        from all_products a
        where a.id = ${product_id};`)
          .then((data) => {
            client.release();
            return data.rows[0];
          });
      })
      // catch any errors in the db connection
      .catch((error) => {
        client.release();
        console.log(error)
      });
  };
  
  // return all the styles for a single product
  const searchStylesForOneProduct = (product_id) => {

    return pool.connect()
      .then((client) => {
        return client.query(`select json_build_object(
        'product_id', al.id,
        'results', (
          select json_agg(json_build_object(
            'style_id', st.id,
            'name', st.name,
            'original_price', st.original_price,
            'sale_price', st.sale_price,
            'default?', st.default_style,
            'photos', (
              select json_agg(json_build_object(
                'thumbnail_url', ph.thumbnail_url,
                'url', ph.url
                ))
                from photos ph where ph.style_id = st.id),
                'skus', (
                  select json_object_agg(
                    sk.id, (select json_build_object(
                      'quantity', sk.quantity,
                      'size', sk.size)
                      from skus where id = sk.id)
                )
             from skus as sk where style_id = st.id
             )
             ))
             as result
             from styles st
             where st.product_id = al.id
             )
             )
             from all_products al
             where al.id = ${product_id};`)
          .then((data) => {
            client.release();
            return data.rows[0].json_build_object;
          })
          // catch any errors in the db connection
          .catch((error) => {
            client.release();
            console.log(error);
          });
      })
  }

module.exports = {
    searchOneProduct: searchOneProduct,
    searchStylesForOneProduct: searchStylesForOneProduct
};