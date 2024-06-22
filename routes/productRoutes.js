import express from "express";
import {
  createProductController,
  deleteProductController,
  deleteProductImageController,
  getAllProductController,
  getSingleProductController,
  getTopProductsController,
  productReviewController,
  updateProductController,
  updateProductImageController,
} from "../controllers/productController.js";
import { isAdmin, isAuth } from "../middleware/authMiddleware.js";
import { singleUpload } from "../middleware/multer.js";
const router = express.Router();
//routes
//get all  product
router.get("/get-all", getAllProductController);

//get single product
router.get("/:id", getSingleProductController);

//create product
router.post("/create", isAuth, singleUpload, isAdmin, createProductController);

//update product
router.put("/:id", isAuth, isAdmin, updateProductController);

//update product image
router.put(
  "/image/:id",
  isAuth,
  singleUpload,
  isAdmin,
  updateProductImageController
);

// delete product image
router.delete(
  "/delete-image/:id",
  isAuth,
  isAdmin,
  deleteProductImageController
);

// delete product
router.delete("/delete/:id", isAuth, isAdmin, deleteProductController);

// REVIEW PRODUCT
router.put("/:id/review", isAuth, productReviewController);

// GET TOP PRODUCTS
router.get("/top", getTopProductsController);

export default router;
