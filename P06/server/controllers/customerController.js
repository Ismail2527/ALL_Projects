const Customer = require("../models/Customer");
const mongoose = require("mongoose");

// Get
// Homepage

exports.homepage = async (req, res) => {
  // Retrieve flash messages
  const messages = req.flash("info"); // Use req.flash() to get flash messages
  const locals = {
    title: "NodeJs",
    description: "Free NodeJs User Management System",
  };

  let perPage = 5;
  let page = req.query.page || 1;

  try {
    const customers = await Customer.aggregate([{ $sort: { updatedAt: -1 } }])
      .skip(perPage * page - perPage)
      .limit(perPage)
      .exec();
    const count = await Customer.countDocuments();

    res.render("index", {
      locals,
      customers,
      current: page,
      pages: Math.ceil(count / perPage),
      messages,
    });
  } catch (error) {
    console.log(error);
  }
};
// exports.homepage = async (req, res) => {
//   // Retrieve flash messages
//   const messages = req.flash("info"); // Use req.flash() to get flash messages
//   const locals = {
//     title: "NodeJs",
//     description: "Free NodeJs User Management System",
//   };

//   try {
//     const customers = await Customer.find({}).limit(22);
//     res.render("index", { locals, messages, customers });
//   } catch (error) {
//     console.log(error);
//   }
// };

// Get about
//  About Page

exports.about = async (req, res) => {
  const locals = {
    title: "About",
    description: "Free NodeJs User Management System",
  };

  try {
    res.render("about", locals);
  } catch (error) {
    console.log(error);
  }
};

// Get
// Add Customer Page
exports.addCustomer = async (req, res) => {
  const locals = {
    title: "Add New Customer - NodeJs",
    description: "Free NodeJs User Management System",
  };
  res.render("customer/add", locals);
};

// Post
// Add Customer
exports.postCustomer = async (req, res) => {
  // console.log(req.body);

  const newCustomer = new Customer({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    details: req.body.details,
    tel: req.body.tel,
    email: req.body.email,
  });
  try {
    await newCustomer.save(); // Save the new customer directly
    req.flash("info", "New customer has been added"); // Set flash message
    res.redirect("/"); // Redirect to homepage
  } catch (error) {
    console.log(error);
    // Optionally, set an error flash message or render the form again with an error message
    req.flash("error", "Failed to add new customer"); // Example for error handling
    res.redirect("/add"); // Redirect to the add customer page if there's an error
  }
};

//Get
// Customer Data

exports.view = async (req, res) => {
  try {
    const customer = await Customer.findOne({ _id: req.params.id });

    const locals = {
      title: "View Customer Data",
      description: "Free NodeJs User Management System",
    };

    res.render("customer/view", {
      locals,
      customer,
    });
  } catch (error) {
    console.log(error);
  }
};

// get
// Edit Customer Data
exports.edit = async (req, res) => {
  try {
    const customer = await Customer.findOne({ _id: req.params.id });

    const locals = {
      title: "Edit Customer Data",
      description: "Free NodeJs User Management System",
    };

    res.render("customer/edit", {
      locals,
      customer,
    });
  } catch (error) {
    console.log(error);
  }
};

//Post
// update customer data
exports.editPost = async (req, res) => {
  try {
    await Customer.findOneAndUpdate(
      { _id: req.params.id },
      {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        tel: req.body.tel,
        email: req.body.email,
        details: req.body.details,
        updatedAt: Date.now(),
      },
      { new: true }
    );
    res.redirect(`/edit/${req.params.id}`);
  } catch (error) {
    console.log(error);
  }
};

// Delete
//  Delete Customer Data

exports.deleteCustomer = async (req, res) => {
  try {
    await Customer.deleteOne({ _id: req.params.id });
    // console.log("this is Delete");
    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
};

//  Get All Customers
// search  customer data

exports.searchCustomers = async (req, res) => {
  const locals = {
    title: "Search Customer Data",
    description: "Free NodeJs User Management System",
  };

  try {
    let searchTerm = req.body.searchTerm;
    const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9 ]/g, "");

    const customers = await Customer.find({
      $or: [
        { firstName: { $regex: new RegExp(searchNoSpecialChar, "i") } },
        { lastName: { $regex: new RegExp(searchNoSpecialChar, "i") } },
      ],
    });

    res.render("search", {
      customers,
      locals,
    });
  } catch (error) {
    console.log(error);
  }
};
