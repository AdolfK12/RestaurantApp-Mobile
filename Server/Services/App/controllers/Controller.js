const { comparePassword } = require("../helpers/bycrpt");
const { signToken } = require("../helpers/jwt");
const {
  User,
  Item,
  Ingredient,
  Category,
  sequelize,
} = require("../models/index");

class Controller {
  static async login(req, res) {
    try {
      const { email, password } = req.body;

      if (!email || !password)
        throw { name: "NoInput", message: "Email and password are required." };

      const user = await User.findOne({ where: { email } });

      if (!user) throw { name: "NotFound", message: "User not found." };

      const validate = comparePassword(password, user.password);

      if (!validate)
        throw { name: "WrongPassword", message: "Password is incorrect." };

      const access_token = signToken({
        id: user.id,
        userName: user.userName,
        email: user.email,
        role: user.role,
        phoneNumber: user.phoneNumber,
        address: user.address,
      });

      res.status(200).json({
        access_token: access_token,
        "User Name": user.userName,
        role: user.role,
        message: "Login successful.",
      });
    } catch (error) {
      console.log(error);
      let statusCode = 500;
      let errMsg = "Internal Server Error";

      if (error.name === "NoInput") {
        statusCode = 400;
        errMsg = error.message;
      } else if (error.name === "NotFound" || error.name === "WrongPassword") {
        statusCode = 401;
        errMsg = error.message;
      }

      res.status(statusCode).json({ error: errMsg });
    }
  }

  static async register(req, res) {
    try {
      const { userName, email, password, phoneNumber, address } = req.body;

      const user = await User.create({
        userName,
        email,
        password,
        role: "admin",
        phoneNumber,
        address,
      });

      res.status(201).json({
        "User Name": user.userName,
        Email: user.email,
        Role: user.role,
        "Phone Number": user.phoneNumber,
        Address: user.address,
        message: "Admin Account Created!",
      });
    } catch (error) {
      console.log(error);
      let statusCode = 500;
      let errMsg = "Internal Server Error";

      if (error.name === "SequelizeUniqueConstraintError") {
        statusCode = 400;
        errMsg = "Email already exists.";
      } else if (error.name === "SequelizeValidationError") {
        statusCode = 400;
        errMsg = error.errors.map((e) => e.message);
      }

      res.status(statusCode).json({ error: errMsg });
    }
  }

  static async getItems(req, res) {
    try {
      const items = await Item.findAll();

      res.status(200).json(items);
    } catch (error) {
      console.log(error);
      let statusCode = 500;
      let errMsg = "Internal Server Error";

      if (error.name === "SequelizeDatabaseError") {
        statusCode = 400;
        errMsg = "Bad request";
      }

      res.status(statusCode).json({ error: errMsg });
    }
  }

  // static async addItemWithIngredients(req, res, next) {
  //   const { itemData, ingredientsData } = req.body;

  //   const { name, description, price, imgUrl, CategoryId } = itemData;

  //   const t = await sequelize.transaction();
  //   try {
  //     const category = await Category.findOne({
  //       where: { id: CategoryId },
  //       transaction: t,
  //     });

  //     if (!category) throw { name: "NotFound", message: "Category not found" };

  //     const newItem = await Item.create(
  //       {
  //         name,
  //         description,
  //         price,
  //         imgUrl,
  //         UserId: req.user.id,
  //         CategoryId,
  //       },
  //       { transaction: t }
  //     );

  //     let ingredientsInput;

  //     ingredientsInput = ingredientsData.map((ingredient) => ({
  //       name: ingredient.name,
  //       ItemId: newItem.id,
  //     }));

  //     await Ingredient.bulkCreate(ingredientsInput, { transaction: t });

  //     await t.commit();

  //     res.status(201).json(newItem);
  //   } catch (error) {
  //     await t.rollback();
  //     console.log(error);
  //     let statusCode = 500;
  //     let errMsg = "Internal Server Error";

  //     if (error.name === "SequelizeValidationError") {
  //       statusCode = 400;
  //       errMsg = error.errors.map((e) => e.message);
  //     } else if (error.name === "NotFound") {
  //       statusCode = 404;
  //       errMsg = error.message;
  //     } else if (error.name === "SequelizeDatabaseError") {
  //       statusCode = 400;
  //       errMsg = "Bad request";
  //     }

  //     res.status(statusCode).json({ error: errMsg });
  //   }
  // }

  // static async addItemWithIngredients(req, res) {
  //   const { name, description, price, imgUrl, CategoryId, ingredients } =
  //     req.body;

  //   const t = await sequelize.transaction();
  //   try {
  //     const category = await Category.findOne({
  //       where: {
  //         id: CategoryId,
  //       },
  //       transaction: t,
  //     });

  //     if (!category) throw { name: "NotFound", message: "Category not found" };

  //     const newItem = await Item.create(
  //       {
  //         name,
  //         description,
  //         price,
  //         imgUrl,
  //         // UserId,
  //         CategoryId,
  //       },
  //       { transaction: t }
  //     );

  //     let ingredientsData = [];

  //     if (Array.isArray(ingredients)) {
  //       ingredientsData = ingredients.map((ingredient) => ({
  //         ItemId: newItem.id,
  //         name: ingredient.name,
  //       }));
  //     } else if (typeof ingredients === "object" && ingredients !== null) {
  //       ingredientsData = [{ ItemId: newItem.id, name: ingredients.name }];
  //     }

  //     const newIngredients = await Ingredient.bulkCreate(ingredientsData, {
  //       transaction: t,
  //     });

  //     await t.commit();

  //     res.status(201).json({
  //       item: newItem,
  //       ingredients: newIngredients,
  //     });
  //   } catch (error) {
  //     await t.rollback();
  //     console.log(error);
  //     let statusCode = 500;
  //     let errMsg = "Internal Server Error";

  //     if (error.name === "SequelizeValidationError") {
  //       statusCode = 400;
  //       errMsg = error.errors.map((e) => e.message);
  //     } else if (error.name === "NotFound") {
  //       statusCode = 404;
  //       errMsg = error.message;
  //     } else if (error.name === "SequelizeDatabaseError") {
  //       statusCode = 400;
  //       errMsg = "Bad request";
  //     }

  //     res.status(statusCode).json({ error: errMsg });
  //   }
  // }

  static async addItemWithIngredients(req, res) {
    const transaction = await sequelize.transaction();
    try {
      const { name, description, price, imgUrl, CategoryId, ingredients } =
        req.body;

      const category = await Category.findByPk(CategoryId, { transaction });
      if (!category) {
        return res.status(400).json({ error: "Invalid category ID" });
      }

      const slug = name
        ?.toLowerCase()
        .replace(/[^\w ]+/g, "")
        .replace(/ +/g, "-");

      const newItem = await Item.create(
        { name, slug, description, price, imgUrl, CategoryId },
        { transaction }
      );

      let isValidIngredients = true;
      ingredients.forEach((ingredient) => {
        ingredient.ItemId = newItem.id;
        if (!ingredient.name) {
          isValidIngredients = false;
        }
      });
      if (!isValidIngredients) {
        return res.status(400).json({ error: "Invalid ingredient name" });
      }

      const newIngredients = await Ingredient.bulkCreate(ingredients, {
        transaction,
      });

      await transaction.commit();
      res
        .status(201)
        .json({
          message: `${name} item created`,
          item: newItem,
          ingredients: newIngredients,
        });
    } catch (error) {
      await transaction.rollback();

      if (error.name === "SequelizeForeignKeyConstraintError") {
        res.status(400).json({ error: "Invalid category ID" });
      } else {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
      }
    }
  }

  static async deleteItem(req, res) {
    const t = await sequelize.transaction();
    try {
      const { id } = req.params;

      const item = await Item.findOne({ where: { id } });
      if (!item) {
        throw { name: "NotFound", message: "Item not found." };
      }

      await Item.destroy({ where: { id }, transaction: t });

      await t.commit();

      res.status(200).json({ message: "Item deleted successfully." });
    } catch (error) {
      await t.rollback();
      console.log(error);
      let statusCode = 500;
      let errMsg = "Internal Server Error";

      if (error.name === "NotFound") {
        statusCode = 404;
        errMsg = error.message;
      }

      res.status(statusCode).json({ error: errMsg });
    }
  }

  static async editItem(req, res) {
    const t = await sequelize.transaction();
    try {
      const { id } = req.params;
      const { name, description, price, imgUrl, CategoryId, ingredients } =
        req.body;

      const item = await Item.findOne({ where: { id } });
      if (!item) {
        throw { name: "NotFound", message: "Item not found." };
      }

      await Item.update(
        { name, description, price, imgUrl, CategoryId },
        { where: { id }, transaction: t }
      );

      if (Array.isArray(ingredients)) {
        await Ingredient.destroy({ where: { ItemId: id }, transaction: t });

        const ingredientsData = ingredients.map((ingredient) => ({
          ItemId: id,
          name: ingredient.name,
        }));

        await Ingredient.bulkCreate(ingredientsData, { transaction: t });
      } else if (typeof ingredients === "object" && ingredients !== null) {
        await Ingredient.destroy({ where: { ItemId: id }, transaction: t });

        const ingredientData = { ItemId: id, name: ingredients.name };

        await Ingredient.create(ingredientData, { transaction: t });
      }

      await t.commit();

      res.status(200).json({ message: "Item updated successfully." });
    } catch (error) {
      await t.rollback();
      console.log(error);
      let statusCode = 500;
      let errMsg = "Internal Server Error";

      if (error.name === "NotFound") {
        statusCode = 404;
        errMsg = error.message;
      }

      res.status(statusCode).json({ error: errMsg });
    }
  }

  static async getItemById(req, res) {
    try {
      const { id } = req.params;

      const item = await Item.findOne({ where: { id } });

      if (!item) {
        throw { name: "NotFound", message: "Item not found." };
      }

      res.status(200).json(item);
    } catch (error) {
      console.log(error);
      let statusCode = 500;
      let errMsg = "Internal Server Error";

      if (error.name === "NotFound") {
        statusCode = 404;
        errMsg = error.message;
      }

      res.status(statusCode).json({ error: errMsg });
    }
  }

  static async getCategories(req, res) {
    try {
      const categories = await Category.findAll();

      res.status(200).json(categories);
    } catch (error) {
      console.log(error);
      let statusCode = 500;
      let errMsg = "Internal Server Error";

      if (error.name === "SequelizeDatabaseError") {
        statusCode = 400;
        errMsg = "Bad request";
      }

      res.status(statusCode).json({ error: errMsg });
    }
  }

  static async addCategory(req, res) {
    try {
      const { name } = req.body;

      const category = await Category.create({ name });

      res.status(201).json({
        id: category.id,
        name: category.name,
        message: "Category added successfully.",
      });
    } catch (error) {
      console.log(error);
      let statusCode = 500;
      let errMsg = "Internal Server Error";

      if (error.name === "SequelizeUniqueConstraintError") {
        statusCode = 400;
        errMsg = "Category already exists.";
      } else if (error.name === "SequelizeValidationError") {
        statusCode = 400;
        errMsg = error.errors.map((e) => e.message);
      } else if (error.name === "ValidationError") {
        statusCode = 400;
        errMsg = error.message;
      }

      res.status(statusCode).json({ error: errMsg });
    }
  }

  static async deleteCategory(req, res) {
    try {
      const { id } = req.params;

      const category = await Category.findOne({ where: { id } });

      if (!category) {
        throw { name: "NotFound", message: "Category not found." };
      }

      await Category.destroy({ where: { id } });

      res.status(200).json({ message: "Category deleted successfully." });
    } catch (error) {
      console.log(error);
      let statusCode = 500;
      let errMsg = "Internal Server Error";

      if (error.name === "NotFound") {
        statusCode = 404;
        errMsg = error.message;
      }

      res.status(statusCode).json({ error: errMsg });
    }
  }

  static async editCategory(req, res) {
    try {
      const { id } = req.params;
      const { name } = req.body;

      const category = await Category.findOne({ where: { id } });

      if (!category) {
        throw { name: "NotFound", message: "Category not found." };
      }

      await Category.update({ name }, { where: { id } });

      res.status(200).json({ message: "Category updated successfully." });
    } catch (error) {
      console.log(error);
      let statusCode = 500;
      let errMsg = "Internal Server Error";

      if (error.name === "NotFound") {
        statusCode = 404;
        errMsg = error.message;
      }

      res.status(statusCode).json({ error: errMsg });
    }
  }

  static async getCategoryById(req, res) {
    try {
      const { id } = req.params;

      const category = await Category.findOne({ where: { id } });

      if (!category) {
        throw { name: "NotFound", message: "Category not found." };
      }

      res.status(200).json(category);
    } catch (error) {
      console.log(error);
      let statusCode = 500;
      let errMsg = "Internal Server Error";

      if (error.name === "NotFound") {
        statusCode = 404;
        errMsg = error.message;
      }

      res.status(statusCode).json({ error: errMsg });
    }
  }

  static async getAllItemsUser(req, res) {
    try {
      const items = await Item.findAll();

      res.status(200).json(items);
    } catch (error) {
      console.log(error);
      let statusCode = 500;
      let errMsg = "Internal Server Error";

      if (error.name === "SequelizeDatabaseError") {
        statusCode = 400;
        errMsg = "Bad request";
      }

      res.status(statusCode).json({ error: errMsg });
    }
  }

  static async getItemByIdUser(req, res) {
    try {
      const { id } = req.params;

      const item = await Item.findOne({ where: { id } });

      if (!item) {
        throw { name: "NotFound", message: "Item not found." };
      }

      res.status(200).json(item);
    } catch (error) {
      console.log(error);
      let statusCode = 500;
      let errMsg = "Internal Server Error";

      if (error.name === "NotFound") {
        statusCode = 404;
        errMsg = error.message;
      }

      res.status(statusCode).json({ error: errMsg });
    }
  }
}

module.exports = Controller;
