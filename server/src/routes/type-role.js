import express from "express";
import TypeRoleModel from "../models/type-role.js";
import RoleModel from "../models/role.js";

const router = express.Router();

// router.get("/", async (request, response) => {
//   try {
//     const types = await TypeRoleModel.find().populate("type").populate("role");
//     console.log("normal");

//     response.send(types);
//   } catch (error) {
//     response.status(500).send(error);
//   }
// });

router.get("/", async (request, response) => {
  try {
    const test = await RoleModel.aggregate([
      {
        $lookup: {
          from: "typeroles",
          localField: "_id",
          foreignField: "role",
          as: "types",
        },
      },
      {
        $unwind: {
          path: "$types",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: "types",
          localField: "types.type",
          foreignField: "_id",
          as: "types.type",
        },
      },
      {
        $unwind: {
          path: "$types.type",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $group: {
          _id: "$_id",
          name: { $first: "$name" },
          gender: { $first: "$gender" },
          types: { $push: "$types" },
        },
      },
    ]);
    response.send(test);
  } catch (error) {
    response.status(500).send(error);
  }
});

router.post("/", async (request, response) => {
  const typeRole = new TypeRoleModel(request.body);

  try {
    await typeRole.save();
    response.send(typeRole);
  } catch (error) {
    response.status(500).send(error);
  }
});

router.put("/:id", async (request, response) => {
  const id = request.params.id;
  const typeRole = request.body;

  try {
    const updatedTypeRole = await TypeRoleModel.findByIdAndUpdate(id, typeRole);
    response.send(updatedTypeRole);
  } catch (error) {
    response.status(500).send(error);
  }
});

router.delete("/:id", async (request, response) => {
  const id = request.params.id;

  try {
    await TypeRoleModel.deleteOne(id);
    response.send(id);
  } catch (error) {
    response.status(500).send(error);
  }
});

export default router;
