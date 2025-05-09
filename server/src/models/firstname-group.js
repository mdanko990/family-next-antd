import mongoose from "mongoose";

const firstnameGroupSchema = new mongoose.Schema({
  group: [
    {
      type: mongoose.Types.ObjectId,
      ref: "FirstName",
    },
  ],
  gender: { type: String, enum: ["M", "F"] },
});

const FirstNameGroupModel = mongoose.model(
  "FirstNameGroup",
  firstnameGroupSchema
);
export default FirstNameGroupModel;
