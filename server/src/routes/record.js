import express from "express";
import RecordModel from "../models/record.js";
const router = express.Router();

router.get("/", async (request, response) => {
  try {
    const records = await RecordModel.find();
    const recordsTotal = await RecordModel.countDocuments();
    const documentsTotal = await DocumentModel.countDocuments();
    response.send({
      data: records,
      recordsTotal,
      documentsTotal,
    });
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
