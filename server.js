require("dotenv").config();
const express = require("express");
const mongoConnect = require("./services/mongo");
const cors = require("cors");
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");

const app = express();

// middleware
app.use(express.json());
app.use(cors());

// routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

const port = process.env.PORT || 8000;

const startServer = async () => {
  await mongoConnect();

  app.listen(port, () => console.log(`Listening on port ${port}...`));
};

startServer();
