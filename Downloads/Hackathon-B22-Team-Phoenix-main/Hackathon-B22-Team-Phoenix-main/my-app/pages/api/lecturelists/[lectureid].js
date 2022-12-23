import dbConnect from "../../../lib/db.connect";
import lectureList from "../../../models/lecturelist.model";
export default async function lectureIdHandler(req, res) {
  const { method } = req;
  const { lectureid } = req.query;
  await dbConnect();
  switch (method) {
    case "GET":
      try {
        const lecture = await lectureList.findById(lectureid);
        return res.status(200).json(lecture);
        console.log(lecture);
      } catch (e) {
        return res.status(400).json(e.message);
      }

    //   break;
    // case "DELETE":
    //   try {
    //     const lecture = await lectureList.findById(lectureid);
    //     return res.status(200).json(lecture);
    //     console.log(lecture);
    //   } catch (e) {
    //     return res.status(400).json(e.message);
    //   }

    //   break;
    //   case "PATCH":
    //     try {
    //       const lecture = await lectureList.findById(lectureid);
    //       return res.status(200).json(lecture);
    //       console.log(lecture);
    //     } catch (e) {
    //       return res.status(400).json(e.message);
    //     }
  
        break;
    default:
      res.status(400).json({ success: "default false" });
  }
}
