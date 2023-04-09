"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsTo(models.Category, { foreignKey: "categoryId" });

      Product.hasMany(models.FavoriteList, { foreignKey: "productId" });
      Product.hasMany(models.ProductComment, { foreignKey: "productId" });
      Product.hasMany(models.OrderDetail, { foreignKey: "productId" });
    }
  }
  Product.init(
    {
      categoryId: DataTypes.INTEGER,
      productName: DataTypes.STRING,
      description: DataTypes.TEXT,
      imageUrl: DataTypes.BLOB,
      price: DataTypes.FLOAT,
    },
    {
      sequelize,
      modelName: "Product",
    }
  );
  return Product;
};
