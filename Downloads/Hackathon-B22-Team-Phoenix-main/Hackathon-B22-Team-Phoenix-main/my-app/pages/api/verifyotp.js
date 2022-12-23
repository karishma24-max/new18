
import UserVerification from "../../models/UserVerification.module"
import dbConnect from "../../lib/db.connect"
import UserModel from "../../models/user.model";
export default async function handler(req, res) {
  await dbConnect();
  
  if(req.method=="POST"){
    const {userId,otp}= req.body;
	const user = await UserVerification.findOne({userId});

	try{
		if (!user) {
			return res.status(404).send("User does not exist")
		}else{
			const {expiresAt}=user;
			if(expiresAt < new Date()){
				await UserVerification.deleteMany({userId})
				return res.send("otp is expired required again")
			}else{
				const verified= user.otp===otp;
				if(!verified){
					return res.status(403).send("Invalid otp")
				}else{
					await UserModel.updateOne({_id:userId},{verified:true})
					await UserVerification.deleteMany({userId})
					return res.send({status:"Verifed",massage:"Email verified successfully"})
				}
			}
		}
	}catch (err) {
		return res.status(403).send({massage:err.message});
	}
  }
}