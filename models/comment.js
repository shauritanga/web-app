const mongoose = require('mongoose');


const commentSchema = new mongoose.Schema({
    message: String,
    author: {
        id: {
            id: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        username: String
    }
});


module.exports = mongoose.model('Comment', commentSchema);