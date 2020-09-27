var express                 = require('express');
var router                  = express.Router();
var passport                = require('passport');
var User                    = require('../models/user');



router.get('/',(req,res)=>{
    res.render('landing');
})
//=================
//AUTHENTICATE ROUTE
//===================
//SHOW REGISTER FORM
router.get('/register',(req,res)=>{
    res.render('register');
})
//INSERT USER IN DATABASE
router.post('/register',(req,res)=>{
    var newUser = new User({username: req.body.username});
    User.register(newUser,req.body.password,(err,user)=>{
        if(err){
          req.flash("error",err.message);
          return  res.render('register');
        }
        passport.authenticate("local")(req,res,function(){
            req.flash("success","Welcome to campgrounds "  + user.username);
            res.redirect("/campgrounds");
        })
    });
});

//LOGIN ROUTE
//=======================
router.get('/login',(req,res)=>{
    res.render('login');
});

//LOGIN POST ROUTE
router.post("/login",passport.authenticate("local",{
    
    successRedirect : "/campgrounds",
    failureRedirect : "/login"
}),(req,res)=>{
   
})

//LOGOUT ROUTE
router.get("/logout",(req,res)=>{
    req.logOut();
    req.flash("success","You are logged out!!");
    res.redirect('/campgrounds');
});
//MIDDLEWARE TO AVOID USER TO CREATE ANY REVIEW IF HE IS NOT LOGIN 
function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }req.flash("error","You need to Log In First..!!");
    res.redirect('/login');
}

module.exports = router;