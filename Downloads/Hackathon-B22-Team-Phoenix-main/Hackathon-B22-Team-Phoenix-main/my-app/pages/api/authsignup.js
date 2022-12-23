
import user from "../../models/user.model"
import dbConnect from "../../lib/db.connect"
import * as argon2 from "argon2";
import Verificationemail from "../../lib/useremailverification";
export default async function handler(req, res) {
  await dbConnect();
  
  if(req.method==="GET"){
    return res.send("Singup")
  }
  else if(req.method==="POST"){
  const user_email = await user.findOne({
    email: req.body.email,
  });

  if (user_email) {
    res.status(404).json({
      message: "EmailID already exists",
    });
}else{
      try {
        const hash = await argon2.hash(req.body.password);
        const new_user = new user({
          name: req.body.name,
          password: hash,
          email: req.body.email
        });
        const created_users = await new_user.save();
      await Verificationemail(created_users,res)
        res.status(201).json({
          newUser: created_users,
          Status:"Panding",
          message:`Student created successfully and please verify your email address to continue with us`
        });
      } catch (error) {
        res.status(404).json({
          error: error,
        });
      }
    }
  
}
}