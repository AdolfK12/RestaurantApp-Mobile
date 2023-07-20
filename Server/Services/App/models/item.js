"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Item extends Model {
    static associate(models) {
      Item.belongsTo(models.Category, {
        foreignKey: "CategoryId",
        as: "Category",
      });

      Item.hasMany(models.Ingredient, { foreignKey: "ItemId" });
      // Item.belongsTo(models.User, { foreignKey: "UserId" });
    }
  }
  Item.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Name is required" },
        },
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Description is required" },
        },
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Price is required" },
          min: {
            args: [18000],
            msg: "Minimum price is 18000",
          },
        },
      },
      imgUrl: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Image URL is required" },
        },
      },
      UserId: {
        type: DataTypes.STRING,
        allowNull: true,
        // validate: {
        //   notEmpty: { msg: "User ID is required" },
        // },
      },
      CategoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Category ID is required" },
        },
      },
    },
    {
      sequelize,
      modelName: "Item",
    }
  );
  return Item;
};
