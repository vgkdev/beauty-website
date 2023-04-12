import db from "../models/index";

const createNewProduct = (data, image) => {
  const { categoryId, productName, description, price } = data;
  const imageUrl = image.buffer;
  // console.log("check imageUrl: ", image);
  return new Promise(async (resolve, reject) => {
    try {
      if (!(categoryId && productName && description && price && imageUrl)) {
        resolve({
          errCode: 1,
          message: "Missing paremeter !",
        });
      }

      const isExist = await db.Product.findOne({
        where: { productName: data.productName },
      });

      //   console.log("check is exist: ", isExist);
      if (isExist) {
        resolve({
          errCode: 2,
          message: "Product existed !",
        });
      } else {
        const result = await db.Product.create({
          categoryId: categoryId,
          productName: productName,
          description: description,
          imageUrl: imageUrl,
          price: price,
        });

        if (result) {
          const product = await db.Product.findAll();
          resolve({
            errCode: 0,
            message: "Create new product successfully",
            product,
          });
        } else {
          resolve({
            errCode: 6,
            message: "Server create product error !",
          });
        }
      }
    } catch (e) {
      reject(e);
    }
  });
};

const getALlProducts = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const product = await db.Product.findAll(); // => array

      if (product.length !== 0) {
        // const productsWithImageUrl = product.map((item) => ({
        //   ...item.toJSON(),
        //   imageUrl: `${req.protocol}://${req.get("host")}/${item.imageUrl}`,
        // }));
        // // product.imageUrl = productsWithImageUrl;
        // console.log("check product: ", product);
        resolve({
          errCode: 0,
          message: "Get all categories successfully",
          product,
        });
      } else {
        resolve({
          errCode: 3,
          message: "Product not found !",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const editProduct = (data, image) => {
  const { id, categoryId, productName, description, price, newProductName } =
    data;
  const imageUrl = image.buffer;
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !(
          productName &&
          newProductName &&
          id &&
          categoryId &&
          description &&
          price &&
          imageUrl
        )
      ) {
        console.log("check missing paremeter: ", imageUrl);
        resolve({
          errCode: 1,
          message: "Missing paremeter !",
        });
      }

      const isExist = await db.Product.findOne({
        where: { productName: newProductName },
      });

      if (isExist) {
        resolve({
          errCode: 2,
          message: "Product existed !",
        });
      } else {
        const [numAffectedRows, updatedRows] = await db.Product.update(
          {
            categoryId: categoryId,
            productName: newProductName,
            description: description,
            imageUrl: imageUrl,
            price: price,
          },
          {
            where: { id: data.id },
            returning: true,
            plain: true,
          }
        );

        if (updatedRows !== 0) {
          const product = await db.Product.findAll();

          resolve({
            errCode: 0,
            message: "Product has been updated",
            product,
          });
        } else {
          resolve({
            errCode: 3,
            message: "Product not found !",
          });
        }
      }
    } catch (e) {
      reject(e);
    }
  });
};

const deleteProduct = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!id) {
        resolve({
          errCode: 1,
          message: "Missing paremeter !",
        });
      }

      const result = await db.Product.destroy({
        where: { id: id },
      });

      // console.log("check delete product: ", result);
      if (result !== 0) {
        const product = await db.Product.findAll();
        resolve({
          errCode: 0,
          message: "Product has been deleted !",
          product,
        });
      } else {
        resolve({
          errCode: 3,
          message: "Product not found !",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  createNewProduct,
  getALlProducts,
  editProduct,
  deleteProduct,
};
