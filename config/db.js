import mongoose from "mongoose";
const ConnectDB= async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log(`Mongo db Connected ${mongoose.connection.host}`.bgGreen)

    }catch(error){
        console.log(` Mongo db error ${error}`.bgRed);
    }
}

export default ConnectDB