require("dotenv").config();
const express = require("express");
const mongoConnect = require("./services/mongo");
const cors = require("cors");
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const workoutRoutes = require("./routes/workout");
const bodyparser = require("body-parser");

const app = express();

const whitelist = [
  "http://localhost:3000",
  "https://clever-fudge-fd4691.netlify.app",
  "https://radiant-buttercream-7e2248.netlify.app",
];

var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

// middleware
// app.use(express.json());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use(cors(corsOptions));

// routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/workout", workoutRoutes);

const port = process.env.PORT || 8000;

const startServer = async () => {
  await mongoConnect();

  app.listen(port, () => console.log(`Listening on port ${port}...`));
};

startServer();
