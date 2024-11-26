const express = require('express');
const router = express.Router();
const isloggedin = require('../middleweares/isLoggedin');
const productModel = require('../models/product_model');
const user_module = require('../models/user_module');



router.get('/',function(req,res){
    let error = req.flash("error");
    res.render("index",{ error , loggedin: false });
});
router.get("/shop", isloggedin ,async function(req,res){
    let products = await productModel.find();
    let success = req.flash("success");
    res.render("shop", { products , success });
})
router.get("/cart", isloggedin, async function (req,res) {
    let user = await user_module
    .findOne({ email: req.user.email})
    .populate("cart");

    const bill = (Number(user.cart[0].price)+20)-Number(user.cart[0].discount);

    res.render("cart",{ user , bill});
})
router.get("/addtocart/:productid", isloggedin ,async function(req,res){
   let user = await user_module.findOne({ email: req.user.email });
   user.cart.push(req.params.productid);
   await user.save();
   req.flash("success","Added to cart");
   res.redirect("/shop");
});
module.exports = router;