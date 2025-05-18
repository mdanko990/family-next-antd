import mongoose from "mongoose";

const RecordSchema = new mongoose.Schema({
  lastName: { type: mongoose.Types.ObjectId, ref: "LastName" },
  maidenName: { type: mongoose.Types.ObjectId, ref: "LastName" },
  firstName: { type: mongoose.Types.ObjectId, ref: "FirstName" },
  // firstNameGroup: { type: mongoose.Types.ObjectId, ref: "FirstNameGroup" },
  patronym: { type: String },
  // person: { type: mongoose.Types.ObjectId, ref: "Person", required: true },
  isMain: { type: Boolean, default: false },
  role: { type: mongoose.Types.ObjectId, ref: "Role", required: true },
  status: { type: mongoose.Types.ObjectId, ref: "Status" },
  age: { type: Number },
  ageUnits: { type: String, enum: ["y", "m", "w", "d"] },
  comment: { type: String },
  document: { type: mongoose.Types.ObjectId, ref: "Document", required: true },
});

const RecordModel = mongoose.model("Record", RecordSchema);
export default RecordModel;
