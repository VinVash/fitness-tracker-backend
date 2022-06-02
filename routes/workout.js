const router = require("express").Router();
const { Workout } = require("../models/workout");
const checkToken = require("../middleware/checkToken");

const padTo2Digits = (num) => {
  return num.toString().padStart(2, "0");
};

const formatDate = (date) => {
  return [
    padTo2Digits(date.getDate()),
    padTo2Digits(date.getMonth() + 1),
    date.getFullYear(),
  ].join("/");
};

router.post("/create-workout", checkToken, async (req, res) => {
  try {
    await new Workout({
      ...req.body,
      date: formatDate(new Date()),
    }).save();
    res.status(201).send({ message: "New workout created successfully" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

router.post("/get-workout", checkToken, async (req, res) => {
  const receivedDate = req.body.date ? req.body.date : formatDate(new Date());
  const workouts = await Workout.find({
    email: req.body.email,
    date: receivedDate,
  });
  if (!workouts) return res.status(404).send({ message: "no workouts found" });
  else
    return res
      .status(200)
      .send({ message: "found workouts successfully", workouts });
});

router.post("/get-workouts", checkToken, async (req, res) => {
  console.log(formatDate(new Date()));
  const workouts = await Workout.find({
    email: req.body.email,
    date: formatDate(new Date()),
  });
  if (!workouts) return res.status(404).send({ message: "no workouts found" });
  else
    return res
      .status(200)
      .send({ message: "found workouts successfully", workouts });
});

module.exports = router;
