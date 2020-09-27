
require('dotenv').config();
var express                  = require('express');
var port                     = process.env.PORT || 3000;
var flash                    = require('connect-flash');
var bodyParser               = require('body-parser');
var passport                 = require('passport');
var localStrategy            = require('passport-local');
var Campground               = require('./models/campgrounds');
var Comment                  = require('./models/comment');
var User                     = require('./models/user');
var methodOverride           = require('method-override');
var mongoose                 = require('mongoose');
var campgroundRoutes         = require('./routes/campground');
var commentRoutes            = require('./routes/comment');
var indexRoutes              = require('./routes/index');
var app                      = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));
app.use(require('express-session')({
    secret : "this is yelp camp project",
    resave : false,
    saveUninitialized : false
}));
app.use(flash());
//PASSPORT CONFIGURATION
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
app.use((req,res,next)=>{
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
})
app.use(methodOverride("_method"));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.set('view engine','ejs');

mongoose.connect(process.env.MONGODB_URI|| 'mongodb://localhost/Yelpcamp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log('connected to db');
}).catch(err=>{
    console.log(err.message);
});


//*****CALLING ALL THE ROUTES****

app.use(campgroundRoutes);
app.use(commentRoutes);
app.use(indexRoutes);




app.listen(port,()=>{
    console.log('server is working');
})