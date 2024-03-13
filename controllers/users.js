const User = require('../models/users');

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

const updateUserById = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json({ message: 'User updated successfully', user: user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

const deleteUserById = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

const register = async(req, res, next) => {
  try {
    const { email, username, password } = req.body;

    // Check if email is already registered
    const checkUserEmail = await User.findOne({ email: email });
    if (checkUserEmail) {
      return res.status(400).json({ message: `Email ${email} is already registered.` });
    }

    // Check if username is already taken
    const checkUserName = await User.findOne({ username: username });
    if (checkUserName) {
      return res.status(400).json({ message: `Username ${username} is already registered.` });
    }

  
    const user = new User({ email, username });

    // Register the user
    const registeredUser = await User.register(user, password);

    // Login the user after registration
    req.login(registeredUser, err => {
      if (err) {
        return next(err);
      }
      return res.json({ message: "Registration and login successful.", user: registeredUser });
    });
  } catch (err) {
    if (err.name === 'ValidationError') {
      // Extract validation errors and send them back to the client
      const messages = Object.values(err.errors).map(val => val.message);
      return res.status(400).json({ error: messages.join(', ') });
    } else {
      // For other kinds of errors, keep the generic error handling
      console.error(err);
      return res.status(500).json({ error: "Server error during registration." });
    }
  }
};

const login = (req, res) => {
  if (req.user) {
    const user = req.user;
    res.json({ 
      message: "Login successful",
      user: user
    });
  } else {
    res.status(401).json({ error: "Authentication failed" });
  }
};

module.exports = {
  getUserById,
  updateUserById,
  deleteUserById,
  register,
  login
};
