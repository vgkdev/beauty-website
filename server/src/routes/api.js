import express from "express";
import {
  handleCreateNewUser,
  handleGetALlUsers,
  handleEditUser,
  handleDeleteUser,
  handleLoginUser,
  handleVerifyUser,
  handleChangePassword,
  handleRegisterUser,
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
  handleEditProductImage,
  handleDeleteProduct,
} from "../controllers/productController";

import {
  handleCreateNewProductComment,
  handleGetALlProductComments,
  handleEditProductComment,
  handleDeleteProductComment,
} from "../controllers/productCommentController";

import {
  handleCreateNewCart,
  handleGetALlCarts,
  handleGetALlCartsByUserId,
  handleEditCart,
  handleDeleteCart,
} from "../controllers/cartController";

const router = express.Router();
//--------------------------------------------------------

// console.log("check upload: ", upload);

let initAPIRoutes = (app) => {
  router.post("/create-new-user", handleCreateNewUser);
  router.get("/get-all-users", handleGetALlUsers);
  router.put("/edit-user", handleEditUser);
  router.delete("/delete-user", handleDeleteUser);
  router.post("/login", handleLoginUser);
  router.post("/register", handleRegisterUser);
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
  router.put("/edit-image-product", handleEditProductImage);
  router.delete("/delete-product", handleDeleteProduct);

  router.post("/create-new-product-comment", handleCreateNewProductComment);
  router.get("/get-all-product-comments", handleGetALlProductComments);
  router.put("/edit-product-comment", handleEditProductComment);
  router.delete("/delete-product-comment", handleDeleteProductComment);

  router.post("/create-new-cart", handleCreateNewCart);
  router.get("/get-all-carts", handleGetALlCarts);
  router.get("/get-all-carts-by-userId", handleGetALlCartsByUserId);
  router.put("/edit-cart", handleEditCart);
  router.delete("/delete-cart", handleDeleteCart);

  return app.use("/api/v1/", router);
};

module.exports = initAPIRoutes;
