const express = require('express');
const router = express.Router();
const upload = require('../config/multer-config');
const productModel = require("../models/product_model");
// console.log("inside products")
router.post('/create',upload.single("image"), async function(req,res){
    console.log("This is create");
    try{let {name,price,discount,bgcolor,panelcolor,textcolor} = req.body;
    
    let product = await productModel.create({
        image: req.file.buffer,
        name,
        price,
        discount,
        bgcolor,
        panelcolor,
        textcolor,
    });
    req.flash("succues","Products created successfully");
    res.redirect("/owners/admin");}
    catch(err){
        res.send(err.message);
    }
});
// router.post('/create', upload.single('image'), async function(req, res) {
//     console.log("Multer Middleware Triggered"); // Check if this is logged
//     console.log(req.file); // Check what the file looks like
//     // Your existing code...
// });

module.exports = router;