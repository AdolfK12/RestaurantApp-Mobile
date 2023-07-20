const Controller = require("../controllers/controller");

const router = require("express").Router();

router.get("/items", Controller.getItems);
router.post("/items", Controller.postItem);
router.get("/items/:id", Controller.getItemDetail);
router.put("/items/:id", Controller.editItem);
router.delete("/items/:id", Controller.deleteItem);

router.get("/users", Controller.getUsers);
router.get("/users/:id", Controller.getUserById);
router.post("/users", Controller.addUser);
router.delete("/users/:id", Controller.deleteUser);

module.exports = router;
