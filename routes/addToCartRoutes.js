import express from 'express';
import { isAuth } from '../middleware/authMiddleware.js';
import { addToCartItemController, getCartItemsController } from '../controllers/addToCartController.js';

const router = express.Router();

//add to cart
router.post('/add',isAuth,addToCartItemController);
router.get('/get-all',isAuth,getCartItemsController);
export default router