import express from "express";
import FirstNameGroupModel from "../models/firstname-group.js";
import FirstNameModel from "../models/firstname.js";
const router = express.Router();

router.post("/", async (request, response) => {
  try {
    const group = new FirstNameGroupModel(request.body);
    const newGroup = await group.save();

    group.group.forEach(async (name) => {
      await FirstNameModel.findByIdAndUpdate(name, { group: newGroup._id });
    });

    response.send(group);
  } catch (error) {
    response.status(500).send(error);
  }
});

export default router;
