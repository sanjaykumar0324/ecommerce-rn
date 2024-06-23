import cartModel from '../models/cartModel.js';
import productModel from '../models/productModel.js';

export const addToCartItemController = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    // Find the product
    const product = await productModel.findById(productId);
    if (!product) {
      return res.status(404).send({
        success: false,
        message: 'No product found'
      });
    }

    // Calculate item price
    const itemPrice = product.price * quantity;

    // Find the user's cart or create a new one
    let cart = await cartModel.findOne({ user: req.user._id });
    if (!cart) {
      cart = new cartModel({
        user: req.user._id,
        items: [],
        price: 0
      });
    }

    // Check if the product is already in the cart
    const existingItemIndex = cart.items.findIndex(item => item.product.toString() === productId);
    if (existingItemIndex !== -1) {
      // Update the quantity and price of the existing item
      cart.items[existingItemIndex].quantity += quantity;
      cart.price += itemPrice;
    } else {
      // Add the new item to the cart
      cart.items.push({ product: productId, quantity });
      cart.price += itemPrice;
    }

    await cart.save();

    res.status(200).send({
      success: true,
      message: 'Item added to cart',
      cart
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: 'Error in add to cart item API'
    });
  }
};

export const getCartItemsController = async (req, res) => {
  try {
    // Find the user's cart
    const cart = await cartModel.findOne({ user: req.user._id }).populate('items.product');

    if (!cart) {
      return res.status(404).send({
        success: false,
        message: 'Cart not found'
      });
    }

    res.status(200).send({
      success: true,
      message: 'Cart items fetched successfully',
      cart
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: 'Error in fetching cart items'
    });
  }
};
