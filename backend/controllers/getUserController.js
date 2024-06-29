const user_model = require("../models/userModel")
const bcryptjs = require("bcryptjs")

exports.getUser = async (req,res)=>{

    const email = req.body.email;

  try {
    const user = await user_model.findOne({ email });

    if (user) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        password: user.password,
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
    
}

exports.updateUserProfile = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Find the user by email (assuming email is unique)
    let user = await user_model.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update user object with new values
    user.name = name || user.name; // Update only if name is provided
    user.email = email || user.email; // Update only if email is provided
    user.password = bcryptjs.hashSync(password,8) || user.password; // Update only if password is provided

    // Save updated user object
    await user.save();

    // Return updated user object as response
    res.status(200).json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
};