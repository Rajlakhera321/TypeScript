const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT;
require("./db")
require("./model");

app.use(express.json());

app.use("/api/v1", require("./router"));

app.listen(port, ()=> console.log(`App.js is running on port ${port}`));