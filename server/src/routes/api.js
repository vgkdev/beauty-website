import express from "express";
import {
  handleCreateNewUser,
  handleGetALlUsers,
  handleEditUser,
  handleDeleteUser,
  handleLoginUser,
  handleVerifyUser,
  handleChangePassword,
} from "../controllers/userController";

import {
  handleCreateNewCategory,
  handleGetALlCategories,
  handleEditCategory,
  handleDeleteCategory,
} from "../controllers/categoryController";

const router = express.Router();

let initAPIRoutes = (app) => {
  router.post("/create-new-user", handleCreateNewUser);
  router.get("/get-all-users", handleGetALlUsers);
  router.put("/edit-user", handleEditUser);
  router.delete("/delete-user", handleDeleteUser);
  router.post("/login", handleLoginUser);
  router.post("/verify-user", handleVerifyUser);
  router.put("/change-password", handleChangePassword);

  router.post("/create-new-category", handleCreateNewCategory);
  router.get("/get-all-categories", handleGetALlCategories);
  router.put("/edit-category", handleEditCategory);
  router.delete("/delete-category", handleDeleteCategory);

  return app.use("/api/v1/", router);
};

module.exports = initAPIRoutes;
