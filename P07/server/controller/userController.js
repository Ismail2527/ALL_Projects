const User = require("../model/userModel");

// Post
const create = async (req, res) => {
  try {
    const userData = new User(req.body);
    // console.log("Inside create user");

    // Removed the unnecessary check for userData
    const savedData = await userData.save();
    res.status(200).json({
      msg: "User created successfully!", // Success message
      user: savedData, // Saved user data
    });
  } catch (error) {
    res.status(500).json({ error: error.message }); // Improved error message
  }
};
// Get
const getAll = async (req, res) => {
  try {
    const userData = await User.find();
    if (!userData) {
      return res.status(404).json({ msg: "User data not found" });
    }
    res.status(200).json(userData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//  Get by id
const getOne = async (req, res) => {
  try {
    const id = req.params.id;
    const userData = await User.findById(id);
    if (!userData) {
      return res.status(404).json({ msg: "User data not found" });
    }
    res.status(200).json(userData);
  } catch (error) {
    res.status(404).json({ error: error });
  }
};

//  Update
const update = async (req, res) => {
  const id = req.params.id;
  try {
    const userData = await User.findByIdAndUpdate(id, req.body, { new: true });
    if (!userData) {
      return res.status(404).json({ msg: "User data not found" });
    }
    res.status(200).json({ msg: "User updated successfully!", user: userData });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

//   Delete
const deleteOne = async (req, res) => {
  const id = req.params.id;
  // console.log("isohosidio");
  try {
    const userData = await User.findById(id);
    if (userData) {
      res.status(200).json({ msg: `This User Deleted ${userData.lname}` });
    }
    if (!userData) {
      return res.status(404).json({ msg: "User data not found" });
    }
    await User.findByIdAndDelete(id);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

module.exports = { create, getAll, getOne, update, deleteOne };
