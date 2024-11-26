const express = require('express');
const router = express.Router();
const ownerModel = require('../models/owners-model');
// console.log()

if (process.env.NODE_ENV === 'development') {
    router.post('/create', async function(req, res) {
        // console.log("inside owener")

            let owners = await ownerModel.find();
            console.log(owners);
            if (owners.length > 0) {
                return res
                .status(503)
                .send("You don't have permission to create another owner");
            }
            let { fullname, email, password } = req.body;

            let createdOwner = await ownerModel.create({
                fullname,
                email,
                password,
            });
            res.status(201).send(createdOwner);
    });
}

router.get('/admin', function(req, res) {
    // The success variable (or any similar variable) is often used in web 
    // applications to provide feedback to users about the result of their actions. 
    const success = req.flash("success") || [];
     // Adjust this based on your use case
    res.render("createproducts", { success });
    // res.render("createproducts");/
});


module.exports = router;
