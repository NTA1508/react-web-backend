const mongoose = require('mongoose');

const wishListSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  productId: 
    {
      type: [String],
      required: true,
    }
});

const WishList = mongoose.model('wishlist', wishListSchema);

module.exports = WishList;
