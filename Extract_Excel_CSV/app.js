const express = require("express");
const {sequelize} = require("./models");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 8080

app.use(express.json());

app.use('/api/v1',require("./router"))

app.listen(port, async () => {
    console.log(`this port is running on port number ${port}`);
    await sequelize.sync({force: false});
    console.log("data base is connected");
})
