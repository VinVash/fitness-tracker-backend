const router = require("express").Router();
const { Workout } = require("../models/workout");
const checkToken = require("../middleware/checkToken");

router.post("/create-workout", checkToken, async (req, res) => {
  try {
    await new Workout({
      ...req.body,
    }).save();
    res.status(201).send({ message: "New workout created successfully" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

router.post("/get-workout", checkToken, async (req, res) => {
  const workouts = await Workout.find({
    email: req.body.email,
    date: req.body.date,
  });
  if (!workouts) return res.status(404).send({ message: "no workouts found" });
  else
    return res
      .status(200)
      .send({ message: "found workouts successfully", workouts });
});

module.exports = router;
