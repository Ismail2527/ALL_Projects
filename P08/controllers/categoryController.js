const categoryModel = require("../models/categoryModel");

//CREATE CAT
const createCategoryController = async (req, res) => {
  try {
    const { title, imageUrl } = req.body;
    //Validation
    if (!title) {
      return res.status(500).send({
        success: false,
        message: "Title is required",
      });
    }
    const newCategory = new categoryModel({ title, imageUrl });
    await newCategory.save();
    res.status(201).send({
      success: true,
      message: "Category created Successfully",
      newCategory,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error in creating category API",
      error,
    });
  }
};

//GET ALL
const getallCategoryController = async (req, res) => {
  try {
    const category = await categoryModel.find({});
    //Validdation
    if (!category) {
      return res.status(500).send({
        success: false,
        message: "No Data Found",
      });
    }
    res.status(200).send({
      success: true,
      categoryLen: category.length,
      message: "Category List",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting all category API",
      error,
    });
  }
};
//UPDATE
const updateCategoryController = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, imageUrl } = req.body;
    const updatedCategory = await categoryModel.findByIdAndUpdate(
      id,
      { title, imageUrl },
      { new: true }
    );
    //Validation
    if (!updatedCategory) {
      return res.status(500).send({
        success: false,
        message: "No Category Found",
      });
    }
    res.status(200).send({
      success: true,
      // categoryLen: category.length,
      message: "Category List Updated Successfully",
      updatedCategory,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Updated category API",
      error,
    });
  }
};
//DELETE
const deleteCategoryController = async (req, res) => {
  try {
    const { id } = req.params;
    //Validation
    if (!id) {
      return res.status(500).send({
        success: false,
        message: "User id not Present",
      });
    }
    //Delete Function
    const category = await categoryModel.findByIdAndDelete(id);
    res.status(200).send({
      success: true,
      message: "User Deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Delete Category API",
      error,
    });
  }
};
module.exports = {
  createCategoryController,
  getallCategoryController,
  updateCategoryController,
  deleteCategoryController,
};
