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
    await lastname.save();
    response.send(lastname);
  } catch (error) {
    response.status(500).send(error);
  }
});

export default router;
