import mongoose from "mongoose";

const lastNameSchema = new mongoose.Schema({
  male: { type: String, require: true },
  female: { type: String, require: true },
});

const LastNameModel = mongoose.model("LastName", lastNameSchema);
export default LastNameModel;
