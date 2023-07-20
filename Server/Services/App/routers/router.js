const express = require("express");
const Controller = require("../controllers/Controller");
// const { authenticate, authorizeAdmin } = require("../middleware/authenticate");
const router = express.Router();

//ADMIN

router.post("/login", Controller.login);
router.post("/register", Controller.register);

router.get("/items", Controller.getItems);
router.post(
  "/items/add",

  Controller.addItemWithIngredients
);
router.delete("/items/delete/:id", Controller.deleteItem);
router.put("/items/edit/:id", Controller.editItem);
router.get("/items/:id", Controller.getItemById);

router.get("/categories", Controller.getCategories);
router.post("/categories/add", Controller.addCategory);
router.delete("/categories/delete/:id", Controller.deleteCategory);
router.put("/categories/edit/:id", Controller.editCategory);
router.get("/categories/:id", Controller.getCategoryById);

//USER

router.get("/client/items", Controller.getAllItemsUser);
router.get("/client/items/:id", Controller.getItemByIdUser);

module.exports = router;
