import dbConnect from "../../lib/db.connect"
import  Jwt  from "jsonwebtoken";
const SECRET_KEY="hsjsdhvbvvvuvvkjvjbv";
const REFRESH_SECRET_KEY="rfhdgdfvgf";
export default async function handler(req, res) {
  await dbConnect();
  
  if(req.method==="GET"){
    return res.send("Singup")
  }
  else if(req.method==="POST"){
    const refreshToken = req.headers["refresh_token"];
    const accessToken = req.headers["access_token"];
  
    try {
      const refresh_verification = Jwt.verify(
        refreshToken,
        REFRESH_SECRET_KEY
      );
  
      try {
        const access_verification = Jwt.verify(
          accessToken,
          SECRET_KEY
        );
        if (!access_verification) {
          const newToken = Jwt.sign(
            {
              id: refresh_verification._id,
              name: refresh_verification.name,
              userType: refresh_verification.userType,
              email:refresh_verification.email,
            },
            SECRET_KEY,
            {
              expiresIn: "1d",
            }
          );
          res.status(200).json({
            AccessToken: newToken,
          });
        } else {
          res.status(200).json({
            message: "You are authorized",
          });
        }
      } catch (error) {
        const newToken = Jwt.sign(
          {
            id: refresh_verification._id,
              name: refresh_verification.name,
              userType: refresh_verification.userType,
              email:refresh_verification.email,
          },
          SECRET_KEY,
          {
            expiresIn: "1d",
          }
        );
        res.status(200).json({
          AccessToken: newToken,
        });
      }
    } catch (error) {
      res.status(404).json({
        error: "YOUR REFRESH TOKEN IS EXPIRED",
      });
    }
  
}
}