const express = require("express");
const app = express();
const port = process.env.PORT || 3001;

const cors = require("cors");
const router = require("./routers/router");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(router);

app.listen(port, () => {
  console.log(`App is listening at port ${port}`);
});
