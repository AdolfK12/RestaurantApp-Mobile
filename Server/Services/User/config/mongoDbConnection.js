const { MongoClient } = require("mongodb");

const connectionString =
  "mongodb+srv://adolfkevinb:arUiF8Ikmu6eEp9v@cluster0.jrjt0tx.mongodb.net";

let db = null;

const mongoConnect = async () => {
  const client = new MongoClient(connectionString);

  try {
    const database = client.db("fase3c2");

    db = database;

    return database;
  } catch (err) {
    await client.close();
  }
};

const getDatabase = () => db;

module.exports = {
  mongoConnect,
  getDatabase,
};
