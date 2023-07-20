const { ObjectId } = require("mongodb");
const { getDatabase } = require("../config/mongoDbConnection");

class User {
  static getCollections() {
    const db = getDatabase();
    return db.collection("Users");
  }

  static async findAll() {
    return this.getCollections().find().toArray();
  }

  static async createUser(user) {
    return this.getCollections().insertOne({
      username: user.username,
      email: user.email,
      password: user.password,
      role: "mobile user",
      phoneNumber: user.phoneNumber,
      address: user.address,
    });
  }

  static async findById(objectId) {
    return this.getCollections().findOne({
      _id: new ObjectId(objectId),
    });
  }

  static async deleteById(id) {
    if (!ObjectId.isValid(id)) {
      throw new Error("Invalid id format");
    }
    return this.getCollections().deleteOne({ _id: new ObjectId(id) });
  }
}

module.exports = User;
