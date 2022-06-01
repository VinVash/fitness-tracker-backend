const mongoose = require("mongoose");

const workoutSchema = new mongoose.Schema({
  email: { type: String, required: true },
  date: { type: String, required: true },
  muscleGroup: { type: String, required: true },
  workout: { type: String },
  weight: { type: Number },
  sets: { type: Number },
  reps: { type: Number },
});

const Workout = mongoose.model("Workout", workoutSchema);

module.exports = { Workout };
