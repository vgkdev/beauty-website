import {
  createNewProduct,
  getALlProducts,
  editProduct,
  deleteProduct,
} from "../services/productService";

const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: "./public/images",
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

// Init upload
// const upload = multer({
//   storage: storage,
// }).single("imageUrl"); //image name
const upload = multer().single("imageUrl");

const handleCreateNewProduct = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      console.error(err);
      res.status(400).json({ message: "Error uploading image" });
    } else {
      console.log("check file: ", req.file);
      const response = await createNewProduct(req.body, req.file);
      return res.status(200).json(response);
    }
  });
};

const handleGetALlProducts = async (req, res) => {
  const response = await getALlProducts();
  return res.status(200).json(response);
};

const handleEditProduct = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      console.error(err);
      res.status(400).json({ message: "Error uploading image" });
    } else {
      const response = await editProduct(req.body, req.file);
      return res.status(200).json(response);
    }
  });
  // const response = await editProduct(req.body);
  // return res.status(200).json(response);
};

const handleDeleteProduct = async (req, res) => {
  const response = await deleteProduct(req.body.id);
  return res.status(200).json(response);
};

module.exports = {
  handleCreateNewProduct,
  handleGetALlProducts,
  handleEditProduct,
  handleDeleteProduct,
};
