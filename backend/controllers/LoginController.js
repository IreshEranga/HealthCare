const bcrypt = require('bcrypt');
const User = require('../models/User'); // Assuming User model is in the 'models' directory

// Login function
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists with the given email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // Compare provided password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Success: Return user information or generate JWT token here
    res.json({ message: "Login successful", user });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = { loginUser };
