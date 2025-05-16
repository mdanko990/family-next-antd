import express from "express";
import RoleModel from "../models/role.js";

const router = express.Router();

router.get("/", async (request, response) => {
  try {
    const roles = await RoleModel.find();
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

export default router;
