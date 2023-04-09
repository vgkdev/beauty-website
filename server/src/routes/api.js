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

import {
  handleCreateNewProduct,
  handleGetALlProducts,
  handleEditProduct,
  handleDeleteProduct,
} from "../controllers/productController";

const router = express.Router();
//--------------------------------------------------------

// console.log("check upload: ", upload);

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

  // router.post(
  //   "/create-new-product",
  //   upload.single("file"),
  //   handleCreateNewProduct
  // );
  router.post("/create-new-product", handleCreateNewProduct);
  router.get("/get-all-products", handleGetALlProducts);
  router.put("/edit-product", handleEditProduct);
  router.delete("/delete-product", handleDeleteProduct);

  return app.use("/api/v1/", router);
};

module.exports = initAPIRoutes;
