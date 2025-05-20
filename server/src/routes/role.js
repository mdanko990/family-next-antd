import express from "express";
import RoleModel from "../models/role.js";

const router = express.Router();

router.get("/", async (request, response) => {
  try {
    const roles = await RoleModel.find().sort({ name: 1 }).populate("types");
    response.send(roles);
  } catch (error) {
    response.status(500).send(error);
  }
});

router.post("/", async (request, response) => {
  const role = new RoleModel(request.body);

  try {
    await role.save();
    response.send(role);
  } catch (error) {
    response.status(500).send(error);
  }
});

router.put("/:id", async (request, response) => {
  const id = request.params.id;
  const role = request.body;

  try {
    const updatedRole = await RoleModel.findByIdAndUpdate(id, role);
    response.send(updatedRole);
  } catch (error) {
    response.status(500).send(error);
  }
});

router.delete("/:id", async (request, response) => {
  const id = request.params.id;

  try {
    await RoleModel.findByIdAndDelete(id);
    response.send(id);
  } catch (error) {
    console.log(error);
    response.status(500).send(error);
  }
});

export default router;
