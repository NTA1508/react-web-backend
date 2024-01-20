const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Products = require('./products');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/ecommerce')

app.get('/getProducts', (req, res) => {
    Products.find()
    .then(products => res.json(products))
    .catch(err => console.log(err))
})

app.get('/getProducts/:id', async (req, res) => {
    try {
      const productId = req.params.id;
      const product = await Products.findById(productId);
  
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }
  
      res.json(product);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

const PORT = 3001;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
