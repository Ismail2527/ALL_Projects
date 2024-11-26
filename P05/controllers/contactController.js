const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModles");

//To Get all contact
const getContact = asyncHandler(async (req, res) => {
  const contacts = await Contact.find({ user_id: req.user.id });
  res.status(200).json(contacts);
});

// To Get all contact
const createContact = asyncHandler(async (req, res) => {
  console.log("The Requrest body is :", req.body);
  const { name, email, phone } = req.body;

  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }
  const contact = await Contact.create({
    name,
    email,
    phone,
    user_id: req.user.id,
  });
  // save();
  res.status(201).json(contact);
});

// To see Contact
const getContactid = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }
  res.status(200).json(contact);
});

// To Upadat Contact
const UpdateContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }

  if (contact.user_id.toString() !== req.user.id) {
    res.status(402);
    throw new Error("User son't have permission to update other user contacts");
  }
  //Here we update the data
  const UpdateContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(200).json(UpdateContact);
});

const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findByIdAndDelete({ _id: req.params.id });
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }
  // if (contact.user_id.toString() !== req.user.id) {
  //   res.status(402);
  //   throw new Error("User son't have permission to update other user contacts");
  // }
  // await contact.remove();
  res.status(200).json(contact);
});

module.exports = {
  getContact,
  createContact,
  deleteContact,
  UpdateContact,
  getContactid,
};
