import mongoose from "mongoose";

const firstNameSchema = new mongoose.Schema({
  name: { type: String, require: true },
  gender: { type: String, enum: ["M", "F"] },
  group: {
    type: mongoose.Types.ObjectId,
    ref: "FirstNameGroup",
  },
});

const FirstNameModel = mongoose.model("FirstName", firstNameSchema);
export default FirstNameModel;
