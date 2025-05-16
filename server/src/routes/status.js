import express from "express";
import StatusModel from "../models/status.js";

const router = express.Router();

router.get("/", async (request, response) => {
  try {
    const statuses = await StatusModel.find();
    response.send(statuses);
  } catch (error) {
    response.status(500).send(error);
  }
});

router.post("/", async (request, response) => {
  const status = new StatusModel(request.body);

  try {
    await status.save();
    response.send(status);
  } catch (error) {
    response.status(500).send(error);
  }
});

export default router;
