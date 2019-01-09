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
    }
});


module.exports = mongoose.model('Post', postSchema);
