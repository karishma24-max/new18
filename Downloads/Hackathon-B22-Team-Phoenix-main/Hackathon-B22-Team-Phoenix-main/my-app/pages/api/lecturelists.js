// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import lecturelist from "../../models/lecturelist.model"
import dbConnect from "../../lib/db.connect"

export default async function handler(req, res) {
  const {method} = req; 
  await dbConnect();
  switch (method) {
    case "GET":
      try {
        const lectures = await lecturelist.find();
        res.status(200).json({ success: true, data: lectures });
      } catch (e) {
        res.status(400).json({ success: false });
      }
      break;
      case "POST":
        try {
          const newlectures = await lecturelist.create(req.body);
          res.status(200).json({ success: true, data: newlectures });
        } catch (e) {
          res.status(400).json({ success: false });
        };
        break;
    default:
      res.status(400).json({ success: "default false" });
  }
}
