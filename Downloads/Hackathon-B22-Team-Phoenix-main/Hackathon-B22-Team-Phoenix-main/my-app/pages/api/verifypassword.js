
import UserVerification from "../../models/UserVerification.module"
import dbConnect from "../../lib/db.connect"
import UserModel from "../../models/user.model";
import * as argon2 from "argon2";
export default async function handler(req, res) {
  await dbConnect();
  
  if(req.method=="POST"){
    const {id,otp,password}= req.body;
    const userdata=await UserModel.findOne({_id:id})
	const user = await UserVerification.findOne({userId:userdata._id});
    const hash = await argon2.hash(password);
	try{
		if (!user) {
			return res.status(404).send("User does not exist")
		}else{
			const {expiresAt}=user;
			if(expiresAt < new Date()){
				await UserVerification.deleteMany({userId:userdata._id})
				return res.send("otp is expired required again")
			}else{
				const verified= user.otp==otp;
				console.log(user.otp,otp)
				if(!verified){
					return res.status(403).send("Invalid otp")
				}else{
					await UserModel.updateOne({_id:userdata._id},{password:hash})
					await UserVerification.deleteMany({_id:userdata._id})
					return res.send({status:"Verifed",massage:"Your password Changed successfully"})
				}
			}
		}
	}catch (err) {
		return res.status(403).send({massage:err.message});
	}
  }
}