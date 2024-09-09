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

module.exports = { createUser };