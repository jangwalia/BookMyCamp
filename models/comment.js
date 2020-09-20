var mongoose = require('mongoose');
const commentSchema = new mongoose.Schema({
body : String,
author : {
    id : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "user"
    },
    username : String
}

});
const Comment = mongoose.model('comment', commentSchema);
module.exports = Comment;