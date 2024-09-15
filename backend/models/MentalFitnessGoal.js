const mongoose = require("mongoose");

const mentalFitnessGoalSchema = new mongoose.Schema(
  {
    user: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User", 
      required: true 
    }, // Reference to User model
    type: { type: String, required: true }, // Goal type (e.g., Stress Management)
    name: { type: String, required: true }, // Name of the goal
    activities: [
      {
        day: { type: Number, required: true }, // Day number (e.g., Day 1, Day 2)
        instruction: { type: String, required: true }, // Instruction for the day
        image: { type: String, required: false }, // URL or path to an image for the activity
        status: { 
          type: String, 
          enum: ["pending", "completed"], 
          default: "pending" 
        }, // Status for the day's activity
      }
    ],
    goalStatus: {
      type: String,
      enum: ["in progress", "completed", "not started"],
      default: "not started", // Overall goal status before activities
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

module.exports = mongoose.model("MentalFitnessGoal", mentalFitnessGoalSchema);
