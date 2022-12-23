const email="sl713430@gmail.com";
const email_password="ghbyexufcexhtvcl";
import UserOtpVerification from "../models/UserVerification.module"
import  nodemailer from "nodemailer" 


const transporter = nodemailer.createTransport({
    service:"gmail",
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
        user:email,
        pass:email_password,
    }
});


const UserOtpVerificationemail=async({_id,email},res)=>{
    
	try{
		const otp= `${Math.floor(1000+Math.random()*9000)}`;
		const Newuserotp= new UserOtpVerification({
			userId:_id,
			otp:otp,
			createdAt:Date.now(),
			expiresAt:Date.now()+300000,
		})
		await Newuserotp.save();
	await transporter.sendMail({
			to:email,
			from:"sl713430@gmail.com",
			subject:"Verify your Email",
			html:`<h2>${otp}</h2> <p>Please enter the otp on the app to verify your Email</p>
			<p>The otp will expire in 5 min</p>`
		}).then(()=>{
			console.log("mail sended")
		})
		
	}catch (err) {
		return res.status(403).send({status:"Failed",massage:err.message});
	}
}


export default UserOtpVerificationemail;