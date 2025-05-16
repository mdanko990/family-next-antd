import mongoose from "mongoose";

const TypeSchema = new mongoose.Schema({
  name: { type: String, require: true },
});

const TypeModel = mongoose.model("Type", TypeSchema);
export default TypeModel;
