import express from "express";
import RecordModel from "../models/record.js";
const router = express.Router();

router.get("/", async (request, response) => {
  try {
    const records = await RecordModel.find();
    response.send(records);
  } catch (error) {
    response.status(500).send(error);
  }
});

router.post("/", async (request, response) => {
  const record = new RecordModel(request.body);

  try {
    await record.save();
    response.send(record);
  } catch (error) {
    response.status(500).send(error);
  }
});

export default router;
