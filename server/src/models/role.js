import mongoose from "mongoose";

const roleSchema = new mongoose.Schema({
  name: { type: String, require: true },
  gender: { type: String, enum: ["M", "F"] },
});

const RoleModel = mongoose.model("Role", roleSchema);
export default RoleModel;
