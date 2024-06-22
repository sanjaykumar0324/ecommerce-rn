import cartModel from '../models/cartModel.js';
import cartItemModel from '../models/cartItemModel.js';
import productModel from '../models/productModel.js';

export const addToCartItemController = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    // Find the product
    const product = await productModel.findById(productId);
    if (!product) {
      return res.status(404).send({
        success: false,
        message: "No product found"
      });
    }

    // Calculate item price
    const itemPrice = product.price * quantity;

    // Create a new cart item
    const cartItem = new cartItemModel({
      product: productId,
      quantity: quantity
    });

    await cartItem.save();

    // Find the user's cart or create a new one
    let cart = await cartModel.findOne({ user: req.user._id });
    if (!cart) {
      cart = new cartModel({
        user: req.user._id,
        items: [],
        price: 0
      });
    }

    // Add the new item to the cart and update the total price
    cart.items.push(cartItem);
    cart.price += itemPrice;

    await cart.save();

    res.status(200).send({
      success: true,
      message: "Item added to cart",
      cart
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in add to cart item API"
    });
  }
};


//get all cart items
export const getCartItemsController = async (req, res) => {
    try {
      // Find the user's cart
      const cart = await cartModel.findOne({ user: req.user._id }).populate('items.product');
      
      if (!cart) {
        return res.status(404).send({
          success: false,
          message: "Cart not found"
        });
      }
  
      res.status(200).send({
        success: true,
        message: "Cart items fetched successfully",
        cart
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error in fetching cart items"
      });
    }
  };