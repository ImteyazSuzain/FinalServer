import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema;

const tokenSchema = new mongoose.Schema({
	userId: {
		type: ObjectId,
		required: true,
		ref: "User",
		unique: true,
	},
	token: { type: String, required: true },
	createdAt: { type: Date, default: Date.now, expires: 3600 },
});

export default mongoose.model("Token", tokenSchema);
