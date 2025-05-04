import express from "express";
import PersonModel from "../models/person.js";
const router = express.Router();

router.get("/", async (request, response) => {
  try {
    const persons = await PersonModel.find();
    response.send(persons);
  } catch (error) {
    response.status(500).send(error);
  }
});

router.post("/", async (request, response) => {
  const person = new PersonModel(request.body);

  try {
    await person.save();
    response.send(person);
  } catch (error) {
    response.status(500).send(error);
  }
});

export default router;
