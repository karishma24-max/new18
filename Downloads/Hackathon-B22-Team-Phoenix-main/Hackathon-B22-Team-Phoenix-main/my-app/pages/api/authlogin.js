
import userModel from "../../models/user.model"
import dbConnect from "../../lib/db.connect"
import  Jwt  from "jsonwebtoken";
import * as argon2 from "argon2";

const SECRET_KEY="hsjsdhvbvvvuvvkjvjbv";
const REFRESH_SECRET_KEY="rfhdgdfvgf";

 async function handler(req, res) {
  await dbConnect();
  if(req.method==="POST"){
  try {
    const user = await userModel.findOne({ email: req.body.email });
    if (user) {
      if(user.verified){
      if (await argon2.verify(user.password, req.body.password)) {
        const access_token = Jwt.sign(
          {
            id: user._id,
            name: user.name,
            userType: user.userType,
            email: user.email
          },
          SECRET_KEY,
          {
            expiresIn: "1d",
          }
        );
        const refresh_token = Jwt.sign(
          {
            id: user._id,
            name: user.name,
            userType: user.userType,
            email: user.email
          },
          REFRESH_SECRET_KEY,
          {
            expiresIn: "7d",
          }
        );

        res.status(200).json({
          AccessToken: access_token,
          RefreshToken: refresh_token,
          name: user.name,
          userType: user.userType,
          email: user.email
        });
      } else {
        res.status(403).json({
          message: "YOUR PASSWORD IS INCORRECT",
        });
      }
    }else{
      return res.status(403).json({message: "please verify your email first"})
    }
    } else {
      res.status(404).json({
        message: "NO USER NOT FOUND",
      });
    }
  } catch (error) {
    res.status(404).json({
      error: "EMAIL OR PASSWORD IS INCORRECT",
    });
  }
}
}

export default handler