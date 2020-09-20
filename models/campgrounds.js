var mongoose = require('mongoose');
//TELLING MONGOOSE WHAT OUR DATA WILL LOOK LIKE WITH SCHEMA
const CampSchema = new mongoose.Schema({
    name : String,
    image : String,
    description : String,
    price: String,
    author : {
        id : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "user"
        },
        username : String
    },
    comment : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "comment"
        }
       
    ]
});
//BUNDLING THE SCHEMA INTO ONE UNIT CALLED MODEL WHICH IS THE COLLECTION IN NEW DATABASE
const Campground = mongoose.model('allCampground', CampSchema);

module.exports = Campground;