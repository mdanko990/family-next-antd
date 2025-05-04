import express from "express";
import EventModel from "../models/event.js";

const router = express.Router();

router.get("/", async (request, response) => {
  try {
    const events = await EventModel.find();
    response.send(events);
  } catch (error) {
    response.status(500).send(error);
  }
});

router.post("/", async (request, response) => {
  const event = new EventModel(request.body);

  try {
    await event.save();
    response.send(event);
  } catch (error) {
    response.status(500).send(error);
  }
});

export default router;
