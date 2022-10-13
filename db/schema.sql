--  drop all the existing tables so they can be recreated
DROP TABLE IF EXISTS products, styles, features;

-- create the table to store the product information
CREATE TABLE IF NOT EXISTS products (
  id int NOT NULL,
  name varchar(255) NOT NULL,
  default_price varchar(255),
  category varchar(255),
  description varchar(255),
  slogan varchar(255),
  PRIMARY KEY(id)
);

-- create the table to store the styles information
CREATE TABLE IF NOT EXISTS styles (
  id int NOT NULL,
  product_id int,
  name varchar(200),
  original_price varchar(100),
  sale_price varchar(100),
  "default?" int,
  PRIMARY KEY(id),
  FOREIGN KEY(product_id) REFERENCES products(id)
);

-- create the table to store the features information
CREATE TABLE IF NOT EXISTS features (
    id int NOT NULL,
    product_id int,
    feature text,
    value text
);

-- create the table to store the photos information
CREATE TABLE IF NOT EXISTS photos (
    id int NOT NULL,
    style_id int,
    url text,
    thumbnail_url text
);

-- create the table to store the SKUs information
CREATE TABLE IF NOT EXISTS skus (
    id int NOT NULL,
    style_id int,
    size text,
    quantity int
);

-- create indices on table to optimize read/write times
CREATE INDEX productsIndex ON products (id);
CREATE INDEX stylesIndex ON styles (id);
CREATE INDEX featuresIndex ON features (id);
CREATE INDEX photosIndex ON photos (id);
CREATE INDEX skusIndex ON skus (id);