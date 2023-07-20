"use strict";
const { Model } = require("sequelize");
const { Op } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    static associate(models) {
      Category.hasMany(models.Item, { foreignKey: "CategoryId" });
    }
  }

  Category.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Name is required" },
          async isUnique(value) {
            const category = await Category.findOne({
              where: {
                name: value,
                id: { [Op.ne]: this.id }, // Exclude current record
              },
            });

            if (category) {
              throw new Error("Category already exists.");
            }
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Category",
    }
  );

  return Category;
};
