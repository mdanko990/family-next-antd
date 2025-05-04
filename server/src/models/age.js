import mongoose from "mongoose";

const AgeSchema = new mongoose.Schema({
  count: { type: Number },
  units: {
    type: String,
    enum: ["years", "months", "weeks", "days"],
    default: "years",
  },
  possibleBirthYear: {
    type: Number,
  },
  record: { type: mongoose.Types.ObjectId, ref: "Record" },
});

const AgeModel = mongoose.model("Age", AgeSchema);
export default AgeModel;
