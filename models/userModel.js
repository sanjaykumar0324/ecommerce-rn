import mongoose from "mongoose";
import bcryptjs from "bcryptjs";
import JWT from 'jsonwebtoken';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "name is required"],
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: [true, "email already taken"],
    },
    password: {
      type: String,
      required: [true, "password is required"],
      minLength: [6, "password should be length 6 or more"],
    },
    address: {
      type: String,
      required: [true, "address is required"],
    },
    city: {
      type: String,
      required: [true, "city is required"],
    },
    country: {
      type: String,
      required: [true, "country is required"],
    },
    phone: {
      type: String,
      required: [true, "pnone no. is required"],
    },
    profilePic: {
      public_id:{
        type :String
      },
      url : {
        type :String
      }
    },
    answer: {
      type: String,
      required: [true, "answer is required"],
      default :"youtube"
    },
    role: {
      type: String,
      default: "user",
    },
  },
  
  { timestamps: true }
);

//hash function
userSchema.pre("save", async function ( next) {
  if (!this.isModified("password")) return next();
  this.password = await bcryptjs.hash(this.password, 10);
});

//compare function
userSchema.methods.comparePassword = async function (plainPassword) {
  return await bcryptjs.compare(plainPassword, this.password);
};

//Jwt token
userSchema.methods.generateToken =function(){
return JWT.sign({_id : this._id},process.env.JWT_SECRET,{expiresIn : '7d'});
}

export const userModel = mongoose.model("Users", userSchema);
export default userModel;
