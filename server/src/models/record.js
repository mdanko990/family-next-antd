import mongoose from "mongoose";

const RecordSchema = new mongoose.Schema({
  lastName: { type: String },
  maidenName: { type: String },
  firstName: { type: String },
  // firstNameGroup: { type: mongoose.Types.ObjectId, ref: "FirstNameGroup" },
  patronym: { type: String },
  // person: { type: mongoose.Types.ObjectId, ref: "Person", required: true },
  is_main: { type: Boolean, default: false },
  role: { type: mongoose.Types.ObjectId, ref: "Role", required: true },
  status: { type: mongoose.Types.ObjectId, ref: "Status" },
  age: { type: Number },
  ageUnits: { type: String, enum: ["y", "m", "w", "d"] },
  comments: { type: String },
  document: { type: mongoose.Types.ObjectId, ref: "Document", required: true },
});

const RecordModel = mongoose.model("Record", RecordSchema);
export default RecordModel;
