const { getDatabase } = require("../config/mongoDbConnection");
const { ObjectId } = require("mongodb");
const User = require("../models/user");
const { hashPassword } = require("../helpers/bcrypt");

module.exports = {
  findAllUsers: async (req, res, next) => {
    const data = await User.findAll();

    res.status(200).json({
      statusCode: 200,
      message: "Successfully fetched all users",
      data,
    });
  },
  createUser: async (req, res, next) => {
    const { username, email, password, role, phoneNumber, address } = req.body;
    const newUser = await User.createUser({
      username,
      email,
      password: hashPassword(password),
      role: "mobile user",
      phoneNumber,
      address,
    });

    res.status(201).json({
      statusCode: 201,
      message: "User created successfully",
      id: newUser.insertedId,
      username,
      email,
      password,
      role,
      phoneNumber,
      address,
    });
  },

  findUserById: async (req, res, next) => {
    const { id } = req.params;

    const foundUser = await User.findById(id);

    res.status(200).json({
      statusCode: 200,
      message: `Successfully fetched user with id: ${id}`,
      data: foundUser,
    });
  },

  deleteUser: async (req, res, next) => {
    const { id } = req.params;
    const deletedUser = await User.deleteById(id);
    if (deletedUser.deletedCount === 1) {
      res.status(200).json({
        statusCode: 200,
        message: `User with id: ${id} was deleted successfully`,
      });
    } else {
      res.status(404).json({
        statusCode: 404,
        message: `User with id: ${id} was not found`,
      });
    }
  },
};
