const studentModel = require("../Models/studentModel");

const homeController = (req, res) => {
  res.render("index");
};
//CREATE DATA
const homeCreateController = async (req, res) => {
  try {
    // Fetch data from the form
    const { name, email, contact, city } = req.body;

    // Validation check
    if (!name || !email || !contact || !city) {
      return res.status(400).send({
        message: "Please fill all the fields",
      });
    }

    // Log email for debugging (optional)

    // Create new user in the database
    const user = await studentModel.create({
      name: name,
      email: email,
      city: city,
      contact: contact,
    });

    // After successful creation, render the 'index' page
    // You can pass a success message here if needed

    res.render("index", {
      message: "User created successfully",
      user: user, // Optionally, pass the created user data
    });
  } catch (error) {
    console.error("Error creating user:", error);
    // Send an error response in case of failure
    res.status(500).send({
      message: "An error occurred while creating the user.",
      error: error.message,
    });
  }
};
//READ DATA
const homeReadController = async (req, res) => {
  try {
    const data = await studentModel.find();
    //validation
    if (!data) {
      return res.status(400).send({
        message: "No data found",
      });
    }
    console.log(data);
    //render the data
    res.render("read", { data });
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
//Show DATA
const homeShowController = async (req, res) => {
  try {
    const id = req.params.id;
    //validation
    if (!id) {
      return res.status(400).send({
        message: "Id Not found",
      });
    }
    const user = await studentModel.findById(id);
    console.log(user);
    res.render("edit", { user });
  } catch (error) {
    console.log(error.message);
  }
};
// UPDATE DATA
const homeUpdateController = async (req, res) => {
  try {
    const id = req.params.id;

    // Validation: Check if ID is provided
    if (!id) {
      return res.status(400).send({
        message: "User ID is required",
      });
    }

    // Find user by ID
    const user = await studentModel.findById(id);

    // Validation: Check if user exists
    if (!user) {
      return res.status(404).send({
        message: "User not found",
      });
    }

    // Fetch data from req.body
    const { name, email, city, contact } = req.body;

    // Update data in the database
    user.name = name || user.name;
    user.email = email || user.email;
    user.city = city || user.city;
    user.contact = contact || user.contact;

    // Save updated user
    const updatedUser = await user.save();

    // Send response
    res.status(200);
    res.redirect("/");
  } catch (error) {
    // Handle errors
    console.error(error);
    return res.status(500).send({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
//Delete Data
const homeDeleteController = async (req, res) => {
  try {
    const id = req.params.id;
    // Validation: Check if ID is provided
    if (!id) {
      return res.status(400).send({
        message: "User ID is required",
      });
    }
    const user = await studentModel.findByIdAndDelete(id);
    res.redirect("/");
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  homeController,
  homeCreateController,
  homeReadController,
  homeShowController,
  homeUpdateController,
  homeDeleteController,
};
