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

export default router;
