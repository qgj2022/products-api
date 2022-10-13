// use express to set up a server
let express = require('express');
// instantiate an express instance and assign it to a variable
let app = express();
// use the JSON body parser
app.use(express.json());
// use compression to reduce sizes of files transmitted
app.use(compression());
// use the dotenv library to grab environmental variables from the .env file
require('dotenv').config();

// deconstruct controllers to use in the routes
const {
    getProduct,
    getStyles
} = require('./controllers.js');  

// route to get info for a single product
app.get('/products/:product_id', (req, res) => {
    getProduct(req.params.product_id)
      .then((currentProd) => {
        res.send(currentProd);
      })
      .catch((error) => {
        res.sendStatus(404);
        console.log(error);
      });
  });
  
// route to get info for a single style
app.get('/products/:product_id/styles', (req, res) => {
getStyles(req.params.product_id)
    .then((currentStyle) => {
        res.send(currentStyle);
    })
    .catch((error) => {
        res.sendStatus(404);
        console.log(error);
    });
});

app.listen(process.env.PORT, () => {
    // log for successful Express server running
    console.log(`listening on port ${process.env.PORT}`);
});