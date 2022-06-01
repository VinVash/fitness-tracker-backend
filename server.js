require("dotenv").config();
const express = require("express");
const mongoConnect = require("./services/mongo");
const cors = require("cors");
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const workoutRoutes = require("./routes/workout");
const bodyparser = require("body-parser");

const app = express();

// middleware
// app.use(express.json());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

// routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/workout", workoutRoutes);

const port = 8000;

const startServer = async () => {
  await mongoConnect();

  app.listen(port, () => console.log(`Listening on port ${port}...`));
};

startServer();
