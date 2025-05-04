import express from "express";
import FirstNameModel from "../models/firstname.js";

const router = express.Router();

router.get("/", async (request, response) => {
  try {
    const names = await FirstNameModel.find();
    response.send(names);
  } catch (error) {
    response.status(500).send(error);
  }
});

router.post("/", async (request, response) => {
  const firstname = new FirstNameModel(request.body);

  try {
    await firstname.save();
    response.send(firstname);
  } catch (error) {
    response.status(500).send(error);
  }
});

export default router;
