import mongoose from "mongoose";

const lastNameSchema = new mongoose.Schema({
  name: { type: String, require: true },
});

const LastNameModel = mongoose.model("LastName", lastNameSchema);
export default LastNameModel;
