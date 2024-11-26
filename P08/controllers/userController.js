//Get User Infor

const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");

//Get User Infor
const getUserController = async (req, res) => {
  try {
    //find user
    const user = await userModel.findById({ _id: req.body.id });
    //validation
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User Not Found",
      });
    }
    //hide password
    user.password = undefined;
    //response
    res.status(200).send({
      success: true,
      message: "User get Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Get User API",
      error,
    });
  }
};
//Update User
const updateUserController = async (req, res) => {
  try {
    //find User
    const user = await userModel.findById({ _id: req.body.id });
    //Validation
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }
    //Update
    const { userName, address, phone } = req.body;
    if (userName) user.userName = userName;
    if (address) user.address = address;
    if (phone) user.phone = phone;
    // save user
    await user.save();
    res.status(200).send({
      success: true,
      message: " User Updated Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Update User API",
      error,
    });
  }
};
//Update User Password
const updateUserPasswordController = async (req, res) => {
  try {
    //Find User
    const user = await userModel.findById({ _id: req.body.id });
    //validation
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User Not found",
      });
    }

    //get data from user
    const { oldPassword, newPassword } = req.body;
    //validation
    if (!oldPassword || !newPassword) {
      return res.status(500).send({
        success: false,
        message: "Please Provide Old and New Password",
      });
    }
    //check oldPassword  and compare Password
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(500).send({
        success: false,
        message: "Invlid Old Password",
      });
    }
    //hash new password
    var salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    //Change with hashed Password
    user.password = hashedPassword;
    await user.save();
    res.status(200).send({
      success: true,
      message: "User Password changed Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Update User Password API",
      error,
    });
  }
};
//RESET PASSWORD
const resetPasswordController = async (req, res) => {
  try {
    const { email, newPassword, answer } = req.body;
    //validation
    if (!email || !newPassword || !answer) {
      return res.status(500).send({
        success: false,
        message: "Please Provide All field",
      });
    }
    // find User by email and Answer
    const user = await userModel.findOne({ email, answer });
    //validation
    if (!user) {
      return res.status(500).send({
        success: false,
        message: "User Not Found or invalid answer",
      });
    }
    //Hashing Password
    var salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    user.password = hashedPassword;
    await user.save();
    res.status(200).send({
      success: true,
      message: "User Password Reset Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in PASSWORD RESET API ",
    });
  }
};
//DELETE USER
const deleteUserController = async (req, res) => {
  try {
    const id = req.params.id;
    //validation
    if (!id) {
      return res.status(500).send({
        success: false,
        message: "Please Provide User ID",
      });
    }
    await userModel.findByIdAndDelete(id);
    return res.status(200).send({
      success: true,
      message: "Your account has been deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Delete Profile API",
      error,
    });
  }
};

module.exports = {
  getUserController,
  updateUserController,
  updateUserPasswordController,
  resetPasswordController,
  deleteUserController,
};
