const mongoose = require('mongoose')


const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    author: {
        id : {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        username:String
    },
    created: {
        type: Date,
        default: Date.now
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ]
});


module.exports = mongoose.model('Post', postSchema);
