import express from "express";
import LastNameModel from "../models/lastname.js";
const router = express.Router();

router.get("/", async (request, response) => {
  try {
    const names = await LastNameModel.find().sort({ name: 1 });
    response.send(names);
  } catch (error) {
    response.status(500).send(error);
  }
});

router.post("/", async (request, response) => {
  const lastname = new LastNameModel({
    ...request.body,
    name: request.body.name,
  });

  try {
    const newLastName = await lastname.save();
    response.send(newLastName);
  } catch (error) {
    response.status(500).send(error);
  }
});

router.put("/:id", async (request, response) => {
  try {
    const updatedLastName = await LastNameModel.findByIdAndUpdate(
      request.params.id,
      {
        name: lastname.male,
        male: lastname.male,
        female: lastname.female,
      }
    );
    response.send(updatedLastName);
  } catch (error) {
    response.status(500).send(error);
  }
});

router.delete("/:id", async (request, response) => {
  try {
    await LastNameModel.findByIdAndDelete(request.params.id);
    response.send(request.params.id);
  } catch (error) {
    response.status(500).send(error);
  }
});

export default router;
