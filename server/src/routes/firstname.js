import express from "express";
import FirstNameModel from "../models/firstname.js";
import FirstNameGroupModel from "../models/firstname-group.js";

const router = express.Router();

router.get("/", async (request, response) => {
  try {
    const names = await FirstNameModel.find().sort({ name: 1 });
    response.send(names);
  } catch (error) {
    response.status(500).send(error);
  }
});

router.get("/by-gender", async (request, response) => {
  try {
    const maleNames = await FirstNameModel.find({ gender: "M" });
    const femaleNames = await FirstNameModel.find({ gender: "F" });
    response.send({
      male: maleNames,
      female: femaleNames,
    });
  } catch (error) {
    response.status(500).send(error);
  }
});

router.get("/by-groups", async (request, response) => {
  try {
    // const groups = await FirstNameGroupModel.find();
    const groupsWithFirstnames = await FirstNameGroupModel.find().populate(
      "group"
    );
    response.send(groupsWithFirstnames);
  } catch (error) {
    response.status(500).send(error);
  }
});

router.get("/by-names", async (request, response) => {
  try {
    // const groups = await FirstNameGroupModel.find();
    const groupsWithFirstnames = await FirstNameModel.find().populate({
      path: "group",
      populate: {
        path: "group",
        select: "name",
      },
    });
    response.send(groupsWithFirstnames);
  } catch (error) {
    response.status(500).send(error);
  }
});

router.post("/many", async (request, response) => {
  const firstnames = request.body;

  try {
    await FirstNameModel.deleteMany();
    const createdArr = await FirstNameModel.insertMany(firstnames);
    response.send(createdArr.map((item) => `${item.name} - ${item._id}`));
  } catch (error) {
    response.status(500).send(error);
  }
});

router.post("/", async (request, response) => {
  let firstName = new FirstNameModel(request.body);

  try {
    firstName = await firstName.save();
    if (!firstName.group) {
      const group = FirstNameGroupModel({
        group: [firstName._id],
        gender: firstName.gender,
      });
      const newGroup = await group.save();
      firstName = await FirstNameModel.findByIdAndUpdate(firstName._id, {
        group: newGroup._id,
      });
    } else {
      const group = await FirstNameGroupModel.findById(firstName.group);
      await FirstNameGroupModel.findByIdAndUpdate(group._id, {
        group: [...group.group, firstName._id],
      });
    }
    response.send(firstName);
  } catch (error) {
    response.status(500).send(error);
  }
});

export default router;
