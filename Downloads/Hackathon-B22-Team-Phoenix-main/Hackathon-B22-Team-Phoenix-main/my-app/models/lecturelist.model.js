import mongoose, { model, Schema } from "mongoose";

const LectureSchema = new Schema({
  lecture_url: {type:String, unique: true, required: true},
  title: {type: String, unique: true, required: true},
  desc: {type: String, required: true},
  lecture_type: {type: String, required: true},
  comments: Array

 
});
module.exports = mongoose.models.Lecturelist || mongoose.model("Lecturelist", LectureSchema)
// c