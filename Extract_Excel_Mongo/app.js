const express = require("express");
const http = require("http");
require("dotenv").config();
const mongoose = require("mongoose");

(async () => {
    try {
      await mongoose.connect(process.env.DB_URL, {});
      const app = express()
      app.use(express.json());
      const server = http.createServer(app)
      app.use('/api/v1', require("./src/router"))
      const PORT = process.env.PORT || 8000
      server
        .listen(PORT)
        .on('listening', () =>
          console.log(`Users App is running on : ${PORT}`),
        )
        .on('error', (err) =>
          console.log(
            `An error is happening to start port ${process.env.NODE_ENV}`,
            err,
          ),
        )
    } catch (error) {
      console.log(`An error is occurred`)
      console.log(error)
      process.exit(1)
    }
  })()