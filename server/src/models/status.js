import mongoose from "mongoose";

const StatusSchema = new mongoose.Schema({
  name: { type: String, require: true },
});

const StatusModel = mongoose.model("Status", StatusSchema);
export default StatusModel;
