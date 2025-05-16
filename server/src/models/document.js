import mongoose from "mongoose";

const documentSchema = new mongoose.Schema({
  records: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Record",
    },
  ],
  type: {
    type: mongoose.Types.ObjectId,
    ref: "Type",
    required: "type is missing",
  },
  date: { type: Date },
  location: { type: String },
  archive: { type: String },
  fond: { type: String },
  inventory: { type: String },
  file: { type: String },
  page: { type: Number },
  link: { type: String },
});

const DocumentModel = mongoose.model("Document", documentSchema);
export default DocumentModel;
