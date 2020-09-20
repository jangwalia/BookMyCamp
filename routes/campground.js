var express            = require('express');
var router             = express.Router();
var Campground         = require('../models/campgrounds');
var middleware         = require('../middleware');

router.get('/campgrounds',(req,res)=>{
    Campground.find({},(err,allCampground)=>{
        if(err){
            req.flash("error","No camp ground found..!!")
        }else{
            res.render('campground/index',{campgrounds:allCampground});
        }
    })
    
})
//WHEN USER ENTER THE FORM THE VALUES WILL BE
//FIRST ENTERED INTO THE DATABASE AND THEN REDIRECT
//PAGE WILL SHOW ALL THE CAMPGROUNDS

//*****THIS IS THE NEW ROUTE-TO SHOW THE FORM****
router.get('/campgrounds/new',middleware.isLoggedIn,(req,res)=>{
    res.render('campground/form');
})
//*****THIS IS THE CREATE ROUTE-WHICH ADDS THE NEW CAMPGROUND****
router.post('/campgrounds',middleware.isLoggedIn,(req,res)=>{
    var author = {
        id : req.user._id,
        username : req.user.username
    }
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var price = req.body.price;
    var newCamp = {name:name,image:image,description:desc,price:price,author:author};
   Campground.create(
    newCamp,(err,newlyCreated)=>{
        if(err){
            console.log(err);
        }else{
            res.redirect('/campgrounds');
        }
    }); 
});


////*****THIS IS THE SHOW ROUTE-TO SHOW DETAILS OF SPECIFIC CAMPGROUND****
router.get('/campgrounds/:id',(req,res)=>{
     
    Campground.findById(req.params.id).populate("comment").exec((err,showDetail)=>{
        if(err || !showDetail){
            req.flash("error","No Campground found");
            res.redirect('back');
        }else{
            res.render("campground/show",{campground:showDetail});
        }
    });
    
})
//EDIT ROUTE
router.get('/campgrounds/:id/edit',middleware.checkcampOwner,(req,res)=>{
    
        Campground.findById(req.params.id,(err,foundcampground)=>{
        res.render('campground/edit',{campground:foundcampground});
              
                
        });    
});
//UPDATE ROUTE
router.put('/campgrounds/:id',middleware.checkcampOwner,(req,res)=>{
    Campground.findByIdAndUpdate(req.params.id,req.body.campground,(err,Updatedcamp)=>{
        if(err){
            res.render("/campgrounds");
        }else{
            res.redirect("/campgrounds/"+ req.params.id);
        }
    })
})

//DESTROY ROUTE
router.delete('/campgrounds/:id',middleware.checkcampOwner,(req,res)=>{
    Campground.findByIdAndRemove(req.params.id,(err)=>{
        if(err){
            res.redirect('/campgrounds');
        }
        res.redirect('/campgrounds');
    })
})


module.exports = router;