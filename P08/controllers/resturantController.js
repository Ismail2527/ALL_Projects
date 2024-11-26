const resturantModel = require("../models/resturantModel");

//CREATE RESTURANT
const createResturantController = async (req, res) => {
  try {
    //Get the restaurant data from the request body
    const {
      title,
      imageUrl,
      foods,
      time,
      pickup,
      delivery,
      isOpen,
      logoUrl,
      rating,
      ratingCount,
      code,
      coords,
    } = req.body;
    //valdation
    if (!title || !coords) {
      return res.status(500).send({
        success: false,
        message: "Please Provide title and coords",
      });
    }
    //Create a new restaurant document
    const newRestaurant = new resturantModel({
      title,
      imageUrl,
      foods,
      time,
      pickup,
      delivery,
      isOpen,
      logoUrl,
      rating,
      ratingCount,
      code,
      coords,
    });
    await newRestaurant.save();
    res.status(200).send({
      success: true,
      message: "Restaurant created successfully",
      newRestaurant,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in RESTURANT create API",
      error,
    });
  }
};
// GET ALL RESTURANTS
const getallResturantController = async (req, res) => {
  try {
    const resturants = await resturantModel.find({});
    //Validation
    if (!resturants) {
      return res.status(404).send({
        success: false,
        message: "No restaurants found",
      });
    }
    res.status(200).send({
      success: true,
      totalcount: resturants.length,
      messgae: "Resturant found Successfully",
      resturants,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in GET ALL RESTURANT API",
      error,
    });
  }
};
// GET RESTURANT BY ID
const getOneResturantController = async (req, res) => {
  try {
    const resturant = await resturantModel.findById({ _id: req.params.id });
    //validation
    if (!resturant) {
      return res.status(404).send({
        success: false,
        message: "Restaurant not found",
      });
    }
    res.status(200).send({
      success: true,
      message: "Restaurant found Successfully",
      resturant,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in GET RESTURANT BY ID API",
      error,
    });
  }
};
// DELETE RESTURANT BY ID
const deleteResturantController = async (req, res) => {
  try {
    const id = req.params.id;
    //validation
    if (!id) {
      return res.status(404).send({
        success: false,
        message: "User id not found",
      });
    }
    const resturant = await resturantModel.findByIdAndDelete(id);
    //validation
    res.status(200).send({
      success: true,
      message: "Restaurant deleted Successfully",
      resturant,
    });
    // save(); // save the changes to the database
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in DELETE RESTURANT BY ID API",
      error,
    });
  }
};
module.exports = {
  createResturantController,
  getallResturantController,
  getOneResturantController,
  deleteResturantController,
};
