const mongoose = require("mongoose");

//Schema
const foodSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Food title is require"],
    },
    description: {
      type: String,
      required: [true, "Food description is require"],
    },
    price: {
      type: Number,
      required: [true, "food price is require"],
    },
    imageUrl: {
      type: String,
      default:
        "https://imgs.search.brave.com/e99lTwqyXyU3p8TOhPdyoTiOpOtuUsB_Sf-xheou7_Q/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/bWFydmVsLmNvbS9j/b250ZW50LzF4L190/MWE2MjA4XzIwMjEw/NjA4NzQ0NDE5NTQu/anBn",
    },
    foodTags: {
      type: String,
    },
    category: {
      type: String,
    },
    code: {
      type: Boolean,
      default: true,
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    resturant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Resturant",
    },
    rating: {
      type: Number,
      default: 5,
      min: 1,
      max: 5,
    },
    ratingCount: {
      type: String,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Foods", foodSchema);
