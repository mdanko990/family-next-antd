import express from "express";
import TypeModel from "../models/type.js";

const router = express.Router();

router.get("/", async (request, response) => {
  try {
    const types = await TypeModel.find();
    response.send(types);
  } catch (error) {
    response.status(500).send(error);
  }
});

router.post("/", async (request, response) => {
  const type = new TypeModel(request.body);

  try {
    await type.save();
    response.send(type);
  } catch (error) {
    response.status(500).send(error);
  }
});

router.put("/:id", async (request, response) => {
  const id = request.params.id;
  const type = request.body;

  try {
    const updatedType = await TypeModel.findByIdAndUpdate(id, type);
    response.send(updatedType);
  } catch (error) {
    response.status(500).send(error);
  }
});

router.delete("/:id", async (request, response) => {
  const id = request.params.id;

  try {
    await TypeModel.findByIdAndDelete(id);
    response.send(id);
  } catch (error) {
    response.status(500).send(error);
  }
});

export default router;
