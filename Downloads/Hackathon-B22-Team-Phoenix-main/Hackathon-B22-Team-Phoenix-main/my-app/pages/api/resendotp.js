
import UserVerification from "../../models/UserVerification.module"
import UserModel from "../../models/user.model"
import dbConnect from "../../lib/db.connect"
import Verificationemail from "../../lib/useremailverification";
export default async function handler(req, res) {
  await dbConnect();
  

  if(req.method=="POST"){
  const {id}=req.body; 
  const data= await UserModel.findOne({_id:id})
  
	try{
		if(data==false) {
				return res.status(403).send("Please provide the valid details");
		}else{
			await UserVerification.deleteOne({userId:id})
            await Verificationemail(data,res)
            res.status(201).json({
              message:`verification mail has been sent to your email again.`
            });
		}
	}catch(err){
		return res.status(403).send({message:err.message});
	}
}
}