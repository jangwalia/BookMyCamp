var middlewareObject = {};
var Campground = require('../models/campgrounds');
var Comment = require('../models/comment');

//ALL MIDDLEWARE
middlewareObject.checkcampOwner = function(req,res,next){
    if(req.isAuthenticated()){
        Campground.findById(req.params.id,(err,foundcampground)=>{
            if(err || !foundcampground){
                req.flash("error","No Campground found");
                res.redirect('back');
            }else{
                if(foundcampground.author.id.equals(req.user._id)){
                    req.flash("success","Campground Updated Successfully..");
                    next();
                }else{
                    req.flash("error","You dont have permission for this..!! ");
                    res.redirect('back');
                }
                

            }
    }) ;
}else{
    res.redirect('back');
}

}

middlewareObject.checkCommentOwner = function(req,res,next){
    if(req.isAuthenticated()){
        Comment.findById(req.params.comments_id,(err,foundcomment)=>{
            if(err){
                res.redirect('back');
            }else{
                if(foundcomment.author.id.equals(req.user._id)){
                    req.flash("success","Comment Updated Successfully..");
                    next();

                }else{
                    req.flash("error","You dont have permission for this..!! ");
                    res.redirect('back');
                }
                

            }
    }) ;
}else{
    res.redirect('back');
}

}

middlewareObject.isLoggedIn = function(req,res,next){
    if(req.isAuthenticated()){
        return next();
}
req.flash("error","You need to login first");
res.redirect('/login');
}

module.exports = middlewareObject;