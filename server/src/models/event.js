import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  name: { type: String, require: true },
});

const EventModel = mongoose.model("Event", eventSchema);
export default EventModel;
