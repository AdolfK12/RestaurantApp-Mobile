const cors = require("cors");
const express = require("express");
const router = require("./routers/router");

const app = express();
const port = process.env.PORT || 987;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(router);

app.listen(port, (_) => console.log(`Orchestrator is working at port ${port}`));
