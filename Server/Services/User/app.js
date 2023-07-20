const cors = require("cors");
const express = require("express");
const { mongoConnect } = require("./config/mongoDbConnection");
const router = require("./routers/router");
const app = express();

const port = process.env.PORT || 3002;

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(router);

(async () => {
  try {
    await mongoConnect();
    app.listen(port, (_) => console.log(`User is listening at port ${port}`));
  } catch (err) {
    console.log(`Failed to connect to mongodb`);
  }
})();
