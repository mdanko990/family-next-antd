import express from "express";
import RecordModel from "../models/record.js";
import DocumentModel from "../models/document.js";
const router = express.Router();

router.get("/", async (request, response) => {
  try {
    const documents = await DocumentModel.find();

    response.send(documents);
  } catch (error) {
    response.status(500).send(error);
  }
});

router.post("/", async (request, response) => {
  const {
    date,
    archive,
    location,
    fond,
    inventory,
    file,
    page,
    link,
    members,
    type,
  } = request.body;

  try {
    const document = new DocumentModel({
      date,
      location,
      archive,
      fond,
      inventory,
      file,
      page,
      link,
      type: type._id,
    });
    const newDocument = await document.save();
    if (members.child)
      await RecordModel.create({
        ...members.child,
        is_main: true,
        document: newDocument._id,
        role: members.child.role._id,
        status: members.child.status._id,
      });
    if (members.mother)
      await RecordModel.create({
        ...members.mother,
        document: newDocument._id,
        role: members.mother.role._id,
        status: members.mother.status._id,
      });
    if (members.father)
      await RecordModel.create({
        ...members.father,
        document: newDocument._id,
        role: members.father.role._id,
        status: members.father.status._id,
      });
    if (members.godmother)
      await RecordModel.create({
        ...members.godmother,
        document: newDocument._id,
        role: members.godmother.role._id,
        status: members.godmother.status._id,
      });
    if (members.godfather)
      await RecordModel.create({
        ...members.godfather,
        document: newDocument._id,
        role: members.godfather.role._id,
        status: members.godfather.status._id,
      });

    response.send(document._id);
  } catch (error) {
    response.status(500).send(error);
  }
});

export default router;
