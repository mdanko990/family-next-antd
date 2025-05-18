import express from "express";
import RoleModel from "../models/role.js";
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
  const mainRoles = JSON.parse(request.query.main) || [];
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
    const newRecords = [];
    Object.entries(members).map(async ([key, member]) => {
      const record = await createRecord(
        key,
        member,
        newDocument._id,
        mainRoles
      );
      newRecords.push(record._id);
    });
    await DocumentModel.findByIdAndUpdate(newDocument._id, {
      records: newRecords,
    });

    response.send();
  } catch (error) {
    response.status(500).send(error);
  }
});

const createRecord = async (roleName, member, document, main) => {
  const role = RoleModel.where({ name: roleName }).findOne();
  return await RecordModel.create({
    ...member,
    document,
    role,
    isMain: main.includes(roleName),
    status: member.status,
  });
};

export default router;
