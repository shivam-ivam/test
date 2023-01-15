const mongoose = require("mongoose");
const env = require("dotenv");
env.config({ path: "./config.env" });
const DB = process.env.DB;
mongoose
  .connect(DB)
  .then(() => {
    console.log("connection done");
  })
  .catch(() => {
    console.log("connection not done");
  });
