var express             = require('express');
var router              = express.Router();
var Campground          = require('../models/campgrounds');
var Comment             = require('../models/comment');
var middleware          = require('../middleware');
//======================
//***COMMENTT ROUTE *****
//=========================
router.get("/campgrounds/:id/comments/new",middleware.isLoggedIn,(req,res)=>{
    Campground.findById(req.params.id,(err,campground)=>{
        if(err){
            console.log(err);
        }else{
            res.render('comment/new',{camp:campground});
        }
    })
    
})

router.post('/campgrounds/:id/comments',middleware.isLoggedIn,(req,res)=>{
    Campground.findById(req.params.id,(err,campground)=>{
        if(err){
            console.log(err);
        }
        else{
            Comment.create(req.body.comment,(err,comment)=>{
                if(err){
                    console.log(err);
                }else{
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();
                    campground.comment.push(comment);
                    campground.save();
                    res.redirect('/campgrounds/' + campground._id);
                }
            })
        }
    })
})
//EDIT ROUTE
router.get('/campgrounds/:id/comments/:comments_id/edit',middleware.checkCommentOwner,(req,res)=>{
    Comment.findById(req.params.comments_id,(err,foundComment)=>{
        if(err){
            res.redirect('back');
        }else{
            res.render('comment/edit',{campground_id:req.params.id,comment:foundComment})
        }
    })
});
//UPDATE ROUTE
router.put('/campgrounds/:id/comments/:comments_id',middleware.checkCommentOwner,(req,res)=>{
    Comment.findByIdAndUpdate(req.params.comments_id,req.body.comment,(err,updatedCooment)=>{
        if(err){
            console.log(err);
        }
        else{
            res.redirect('/campgrounds/' + req.params.id);
        }
    })
})
//DESTROY ROUTE
router.delete('/campgrounds/:id/comments/:comments_id',middleware.checkCommentOwner,(req,res)=>{
    Comment.findByIdAndRemove(req.params.comments_id,(err,comment)=>{
        if(err){
            res.redirect('back');
        }else{
            res.redirect('/campgrounds/' + req.params.id);
        }
    })
})


module.exports = router;