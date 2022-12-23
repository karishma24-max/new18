import mongoose, { model, Schema } from "mongoose";

const userSchema = new Schema({
  name: { type: String},
  password : {type:String,required:true},
  email: { type: String, required: true,unique:true},
  userType:{type:String,enum:["Student","Teacher"],default:"Student"},
  verified:{
		type: Boolean,
		default:false
	}
});

// mongoose.models={}
module.exports = mongoose.models.User || mongoose.model("User", userSchema);