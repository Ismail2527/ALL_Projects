const mongoose = require("mongoose");
const { applyTimestamps } = require("./resturantModel");

//schma
const categorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "category title is required"],
    },
    imageUrl: {
      type: String,
      default:
        "https://imgs.search.brave.com/e99lTwqyXyU3p8TOhPdyoTiOpOtuUsB_Sf-xheou7_Q/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/bWFydmVsLmNvbS9j/b250ZW50LzF4L190/MWE2MjA4XzIwMjEw/NjA4NzQ0NDE5NTQu/anBn",
    },
  },
  { timestamps: true }
);

//export
module.exports = mongoose.model("categoryModel", categorySchema);
