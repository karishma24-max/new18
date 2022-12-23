
import UserVerification from "../../models/UserVerification.module"
import dbConnect from "../../lib/db.connect"
import Verificationemail from "../../lib/useremailverification";
import Usermodel from "../../models/user.model";
export default async function handler(req, res) {
  await dbConnect();
  

  if(req.method=="POST"){
  const {id}=req.body; 
  const userdata=await Usermodel.findOne({_id:id})
  console.log(userdata)
	try{
		if(!userdata) {
				return res.status(403).send("Please provide the valid details");
		}else{
			await UserVerification.deleteMany({userId:userdata._id})
            await Verificationemail(userdata,res)
            res.status(201).json({
              message:`Please Verify your email to change password.`
            });
		}
	}catch(err){
		return res.status(403).send({message:err.message});
	}
}
}