import express from "express";
import LastNameModel from "../models/lastname.js";
const router = express.Router();

router.get("/", async (request, response) => {
  try {
    const names = await LastNameModel.find();
    response.send(names);
  } catch (error) {
    response.status(500).send(error);
  }
});

router.post("/", async (request, response) => {
  console.log("create", request.body);
  const lastname = new LastNameModel(request.body);

  try {
    const newLastName = await lastname.save();
    response.send(newLastName);
  } catch (error) {
    response.status(500).send(error);
  }
});

router.put("/:id", async (request, response) => {
  console.log("update", request.body);

  try {
    const updatedLastName = await LastNameModel.findByIdAndUpdate(
      request.params.id,
      {
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
  console.log("delete", request.params.id);
  try {
    await LastNameModel.findByIdAndDelete(request.params.id);
    response.send(request.params.id);
  } catch (error) {
    response.status(500).send(error);
  }
});

export default router;
