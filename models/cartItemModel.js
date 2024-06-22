import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "products",
    required: [true, "Product is required"]
  },
  quantity: {
    type: Number,
    required: [true, "Quantity is required"],
    default: 1,
    min: 1,
    max: 10
  }
});

const CartItem = mongoose.model("CartItem", cartItemSchema);
export default CartItem;
