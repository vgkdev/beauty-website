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

const router = express.Router();

let initAPIRoutes = (app) => {
  router.post("/create-new-user", handleCreateNewUser);
  router.get("/get-all-users", handleGetALlUsers);
  router.put("/edit-user", handleEditUser);
  router.delete("/delete-user", handleDeleteUser);
  router.post("/login", handleLoginUser);
  router.post("/verify-user", handleVerifyUser);
  router.put("/change-password", handleChangePassword);

  return app.use("/api/v1/", router);
};

module.exports = initAPIRoutes;
