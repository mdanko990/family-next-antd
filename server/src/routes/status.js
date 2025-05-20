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

router.put("/:id", async (request, response) => {
  const id = request.params.id;
  const status = request.body;

  try {
    const updatedStatus = await StatusModel.findByIdAndUpdate(id, status);
    response.send(updatedStatus);
  } catch (error) {
    response.status(500).send(error);
  }
});

router.delete("/:id", async (request, response) => {
  const id = request.params.id;

  try {
    await StatusModel.findByIdAndDelete(id);
    response.send(id);
  } catch (error) {
    response.status(500).send(error);
  }
});

export default router;
