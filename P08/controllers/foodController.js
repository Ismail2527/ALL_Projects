const foodModel = require("../models/foodModel");
const orderModel = require("../models/orderModel");

//CREATE ROUTES
const createFoodController = async (req, res) => {
  try {
    //Get Data from user
    const {
      title,
      description,
      price,
      imageUrl,
      foodTags,
      category,
      isAvailable,
      resturant,
      rating,
      ratingCount,
    } = req.body;
    // Validation
    if (!title || !description || !price) {
      return res.status(500).send({
        success: false,
        message: "Fill minimum three fields title, description, price",
      });
    }
    //Create Food
    const food = new foodModel({
      title,
      description,
      price,
      imageUrl,
      foodTags,
      category,
      isAvailable,
      resturant,
      rating,
      ratingCount,
    });
    await food.save();
    res.status(201).send({
      success: true,
      message: "Food created successfully",
      food,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error creating food API",
      error,
    });
  }
};
// GET ALL
const getallFoodController = async (req, res) => {
  try {
    const food = await foodModel.find({});
    //Validation
    if (!food) {
      return res.status(500).send({
        success: false,
        message: "No foods available",
      });
    }
    res.status(200).send({
      success: true,
      foodlen: food.length,
      message: "Foods retrieved successfully",
      food,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error fetching all food API",
      error,
    });
  }
};
// GET ONE
const getOneFoodController = async (req, res) => {
  try {
    const { id } = req.params;
    //Validation
    if (!id) {
      return res.status(500).send({
        success: false,
        message: "Invalid id or id not provided",
      });
    }
    const food = await foodModel.findById(id);
    //Validation
    if (!food) {
      return res.status(500).send({
        success: false,
        message: "Food not found",
      });
    }
    res.status(500).send({
      success: true,
      message: "Food retrieved successfully",
      food,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error fetching one food API",
      error,
    });
  }
};
// GET FOOD BY RESTURANT
const getfoodByResturantController = async (req, res) => {
  try {
    const resturantId = req.params.id;
    //Validation
    if (!resturantId) {
      return res.status(500).send({
        success: false,
        message: "Invalid id or id not provided",
      });
    }
    const food = await foodModel.find({ resturant: resturantId });
    //Validation
    if (!food) {
      return res.status(500).send({
        success: false,
        message: "Food not found",
      });
    }

    res.status(500).send({
      success: true,
      message: "Food retrieved successfully",
      food,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error fetching one food API",
      error,
    });
  }
};
// UPDATE FOOD
const updateFoodByResturantController = async (req, res) => {
  try {
    //Get id form user
    const id = req.params.id;
    //validation
    if (!id) {
      return res.status(400).send9({
        success: false,
        message: "Invalid id or id not provided",
      });
    }
    const {
      title,
      description,
      price,
      imageUrl,
      foodTags,
      category,
      isAvailable,
      resturant,
      rating,
      ratingCount,
    } = req.body;
    //Get data from database
    const food = await foodModel.findById(id);
    //Validation
    if (!food) {
      return res.status(400).send({
        success: false,
        message: "Food Id not found",
      });
    }
    if (title) food.title = title;
    if (description) food.description = description;
    if (price) food.price = price;
    if (imageUrl) food.imageUrl = imageUrl;
    if (foodTags) food.foodTags = foodTags;
    if (category) food.category = category;
    if (isAvailable) food.isAvailable = isAvailable;
    if (resturant) food.resturant = resturant;
    if (rating) food.rating = rating;
    if (ratingCount) food.ratingCount = ratingCount;
    await food.save();
    res.status(200).send({
      success: true,
      message: "Food updated successfully",
      food,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error updating food API",
      error,
    });
  }
};
// DELETE FOOD
const deleteFoodByResturantController = async (req, res) => {
  try {
    //GET ID
    const id = req.params.id;
    //Validation
    if (!id) {
      return res.status(400).send({
        success: false,
        message: "User ID is Not Found",
      });
    }
    console.log("jdojoejffo");
    //DELETE FOOD
    const food = await foodModel.findByIdAndDelete(id);
    res.status(200).send({
      success: true,
      message: "Food deleted successfully",
      food,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error deleting food API",
      error,
    });
  }
};
// PLACE ORDER
const placeOrderController = async (req, res) => {
  try {
    const { cart, payment } = req.body;
    //Validation
    if (!cart || !payment) {
      return res.status(500).send({
        success: false,
        message: "Cart and payment are required",
      });
    }
    const total = 0;
    //Calcution payment
    cart.forEach((item) => {
      total += item.price * item.quantity;
    });
    const newOrder = new orderModel({
      foods: cart,
      payment,
      buyer: req.body.id,
    });
    await newOrder.save();
    res.status(201).send({
      success: true,
      message: "Order placed successfully",
      newOrder,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error placing order api",
      error,
    });
  }
};
module.exports = {
  createFoodController,
  getallFoodController,
  getOneFoodController,
  getfoodByResturantController,
  updateFoodByResturantController,
  deleteFoodByResturantController,
  placeOrderController,
};
