const express = require('express');
const router = express.Router();
const {registerUsers,loginUser,logout} = require("../controllers/authControler");
router.get('/',function(req,res){
    res.send("Hey I am usersRouters");
})
router.post('/register',registerUsers);

router.post('/login',loginUser);

router.get("/logout",logout);
module.exports = router;