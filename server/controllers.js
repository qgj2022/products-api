// deconstruct database functions
let {
    searchOneProduct,
    searchStylesForOneProduct
} = require('../db/db.js');

// return information for the given product
let getProduct = (product_id) => {
  return searchOneProduct(product_id);
};

// return information for the given style
let getStyles = (product_id) => {
  return searchStylesForOneProduct(product_id);
};

// export controllers to use in server.js
module.exports = {
    getProduct: getProduct,
    getStyles: getStyles
};