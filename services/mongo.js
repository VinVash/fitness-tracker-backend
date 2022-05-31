const mongoose = require("mongoose");
require("dotenv").config();

const MONGO_URL = process.env.MONGO_URL;
console.log(process.env.MONGO_URL);

mongoose.connection.once("open", () => {
  console.log("Connection is ready!");
});

mongoose.connection.on("error", (err) => {
  console.log(err);
});

const mongoConnect = async () => {
  await mongoose.connect(MONGO_URL);
};

module.exports = mongoConnect;

// username: vinamra password: vinamra
