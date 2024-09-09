const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const userSchema = new mongoose.Schema(
  {
    userID: { type: Number }, // This will be auto-incremented
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    mobile: { type: String, required: true }, // Field for mobile
    profession: { type: String, required: false }, // Optional profession field
    gender: { type: String }, // Field for gender
    password: { type: String, required: true },
  },
  {
    timestamps: true, // Automatically creates 'createdAt' and 'updatedAt'
  }
);

// Apply auto-increment to userID
userSchema.plugin(AutoIncrement, { inc_field: "userID" });

module.exports = mongoose.model("User", userSchema);
