import mongoose from "mongoose";

const typeRoleSchema = new mongoose.Schema({
  role: { type: mongoose.Types.ObjectId, ref: "Role" },
  type: { type: mongoose.Types.ObjectId, ref: "Type" },
  limit: { type: Number, default: 1 },
});

const RoleModel = mongoose.model("TypeRole", typeRoleSchema);

export default RoleModel;
