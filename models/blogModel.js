const mongoose = require('mongoose');

const blogSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        content: {
            type: String,
            required: true
        },
        author: {
            type: String,
            required: true
        },
        category: {
            type: String,
            required: true
        },
    },
    {
        timestamps: true,
    },
);

const blog = mongoose.model('Blog', blogSchema);
module.exports.blog = blog;