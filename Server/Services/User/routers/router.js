const express = require("express");
const router = express.Router();

const {
  findAllUsers,
  createUser,
  findUserById,
  deleteUser,
} = require("../controllers/controller");

router.get("/users", findAllUsers);
router.get("/users/:id", findUserById);
router.post("/users", createUser);
router.delete("/users/:id", deleteUser);

module.exports = router;
