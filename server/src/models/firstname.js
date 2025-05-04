import mongoose from "mongoose";

const firstNameSchema = new mongoose.Schema({
  name: { type: String, require: true },
  gender: { type: String, enum: ["M", "F"] },
  similar: { type: [mongoose.Types.ObjectId], ref: "FirstName" },
});

const FirstNameModel = mongoose.model("FirstName", firstNameSchema);
export default FirstNameModel;
