import mongoose from "mongoose";

const RecordSchema = new mongoose.Schema({
  index: { type: String, required: true },
  person: { type: mongoose.Types.ObjectId, ref: "Person", required: true },
  is_main: { type: Boolean, default: false },
  event: { type: mongoose.Types.ObjectId, ref: "Event", required: true },
  date: { type: Date },
  role: { type: mongoose.Types.ObjectId, ref: "Role", required: true },
  status: { type: mongoose.Types.ObjectId, ref: "Status" },
  age: { type: Number },
  age: { type: String, enum: ["y", "m", "w", "d"] },
  comments: { type: String },
  registrationLocation: { type: String },
  archive: { type: String },
  fond: { type: String },
  inventory: { type: String },
  file: { type: String },
  page: { type: Number },
  link: { type: String },
});

const RecordModel = mongoose.model("Record", RecordSchema);
export default RecordModel;
