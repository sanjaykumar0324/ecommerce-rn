import cloudinary from 'cloudinary';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan';
import Stripe from "stripe";
import ConnectDB from './config/db.js';
import testRoute from './routes/testRoute.js';
import helmet from "helmet";
import mongoSanitize from 'express-mongo-sanitize';


// always top env config
dotenv.config();


//database connection
ConnectDB();



//stripe configuration
export const stripe = new Stripe(process.env.STRIPE_API_SECRET);

//cloudinary config 
cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
  });


//rest object
const app= express()

//middle ware
app.use(helmet())
app.use(mongoSanitize())
app.use(morgan("dev"))
app.use(express.json())
app.use(cors())
app.use(cookieParser())

//route imports
import categoryRoutes from './routes/categoryRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import addToCartItemRoutes from './routes/addToCartRoutes.js'
app.use('/api/v1',testRoute)
app.use('/api/v1/user',userRoutes)
app.use('/api/v1/product',productRoutes)
app.use('/api/v1/cat',categoryRoutes)
app.use('/api/v1/order',orderRoutes)
app.use('/api/v1/cart',addToCartItemRoutes)


app.get('/', (req,res)=>{
    return res.status(200).send("<h1> welcome to Node server </h1>");
})

//port
const PORT=process.env.PORT || 8080;

//listen
app.listen(PORT,()=>{
    console.log(` server running ${process.env.PORT} on ${process.env.NODE_ENV} MOde`.bgMagenta)
})

export default app
