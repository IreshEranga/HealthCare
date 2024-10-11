const User = require('../models/User');
const bcrypt = require('bcrypt');

const createUser = async(req,res) => {
    const {first_name, last_name, email, mobile, profession, gender, password} = req.body;

    try{
        const existingUser = await User.findOne({email});

        if(existingUser){
            return res.status(400).json({ message: "User already exists with this email" });
        }

        // Hash the user's password before saving it to the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
        first_name,
        last_name,
        email,
        mobile,
        profession,
        gender,
        password: hashedPassword // Store the hashed password
      });
  
      // Save the user to the database
      await newUser.save();

      res.status(201).json({ message: "User registered successfully" });

    }catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get user details by user ID
const getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Update user details
const updateUserDetails = async (req, res) => {
  const { id } = req.params;
  const { first_name, last_name, email, mobile, profession, gender } = req.body;

  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update user details
    user.first_name = first_name || user.first_name;
    user.last_name = last_name || user.last_name;
    user.email = email || user.email;
    user.mobile = mobile || user.mobile;
    user.profession = profession || user.profession;
    user.gender = gender || user.gender;

    await user.save();
    res.status(200).json({ message: "User details updated successfully", user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

const updateUserTypeToPremium = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update user type to 'premium'
    user.type = 'premium';

    await user.save();
    res.status(200).json({ message: "User type updated to premium successfully", user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};


const getUserType = async (req, res) => {
  const { id } = req.params;

  try {
    // Find the user by ID
    const user = await User.findById(id);

    // Check if the user exists
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Return the user's type
    res.status(200).json({ type: user.type });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};



module.exports = { createUser,getUserById, 
  updateUserDetails, 
  updateUserTypeToPremium ,
  getUserType};