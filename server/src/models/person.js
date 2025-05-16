import mongoose from "mongoose";

const personSchema = new mongoose.Schema({
  lastName: {
    type: String,
  },
  maidenName: {
    type: String,
  },
  firstName: {
    type: String,
  },
  patronym: {
    type: String,
  },
});

const PersonModel = mongoose.model("Person", personSchema);
export default PersonModel;
