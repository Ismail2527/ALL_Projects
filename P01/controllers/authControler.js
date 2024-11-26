const userModel = require("../models/user_module");
const {generateToken} = require("../utils/generateToken");
const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');


module.exports.registerUsers = async function(req,res){
    try{
        let {email,password,fullname } = req.body;
        // Generate the salt 
        let user = await userModel.findOne({email: email})
        if(user) return res.status(401).send("You are already Register")
        bcrypt.genSalt(10,function(err,salt){
            //After generating the salt, the plain-text password (password) is 
            // combined with the salt, and bcrypt hashes this 
            // combination to create the hashed password (hash).
             //This is what will be stored in your database
            bcrypt.hash(password,salt,async function(err,hash) {
                if(err){
                    return res.send(err.message);
                }else{
                    // let user = await
                    let user = await userModel.create({
                        email,
                        password: hash,
                        fullname,
                    });
                    // This method creates a JSON Web Token (JWT) that encodes the given payload
                    // inside the generateToken function is present
                    let token = generateToken(user);
                    res.cookie("token",token);

                    res.send("user created successfully")
                }
            });
        });
    }catch(err){
        console.log(err.message);
    }
};

module.exports.loginUser = async function (req,res) {
    let { email, password} = req.body;

    // console.log(req.body);
    let user = await userModel.findOne({email: email});
    if(!user) return res.send("Email or Passwrod incorrect");
    // The callback function receives two arguments:
// err: If an error occurs during the comparison, this will contain the error information.
// result: This is a boolean value that will be true if the passwords match and false if they do not.
    bcrypt.compare(password, user.password,function(err,result){
        if(result){
            let token = generateToken(user);
            // Here the cookie doing sending token to the user website
            res.cookie("token",token);
            // res.send("You can login");
            return res.redirect("/shop");
        }else{
            return res.send("Email or Passwrod incorrect");
        }
    })
};

module.exports.logout = function(req,res){
    res.cookie("token","");
    res.redirect("/")
}
