import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: [true, "User is required"]
  },
  items: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CartItem"
    }
  ],
  price: {
    type: Number,
    required: [true, "Price is required"],
    default: 0
  }
}, { timestamps: true });

const Cart = mongoose.model("Cart", cartSchema);
export default Cart;
