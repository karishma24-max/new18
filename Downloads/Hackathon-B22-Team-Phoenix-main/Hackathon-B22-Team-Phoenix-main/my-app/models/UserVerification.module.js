import mongoose, { model, Schema } from "mongoose";

const Usrotpverification = new Schema({
	userId: String,
	otp: String,
    createdAt: Date,
    expiresAt: Date
});

module.exports = mongoose.models.Emailverification || mongoose.model("Emailverification", Usrotpverification);
