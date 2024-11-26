const jwt = require('jsonwebtoken');
const userModel = require("../models/user_module");
module.exports = async function (req,res,next) {
    console.log(req.cookies.token);
    // console.log("inside isloggedin")
    if(!req.cookies.token){
        req.flash("error","You need to login first");
        return res.redirect("/");
    }
    try{
        let decoded = jwt.verify(req.cookies.token,process.env.JWT_KEY);
        let user = await userModel
        .findOne({email:decoded.email})
        .select("-password");

        req.user = user;
        next();
    }catch (error) {
        console.error("JWT verification failed:", error);
        req.flash("error", "Something went wrong.");
        res.redirect("/");
    }
    
}