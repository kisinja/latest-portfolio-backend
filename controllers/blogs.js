const { blog } = require("../models/blogModel");


const getBlogs = async (req, res) => {
    try {
        const blogs = await blog.find();

        if (blogs) {
            return res.send(blogs).status(200);
        } else {
            return res.status(404).send({ "message": "No blogs found" });
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).send({ "message": "Internal Server Error" });
    }
}

const createBlog = async (req, res) => {
    try {
        if (!req.body.title || !req.body.imgUrl || !req.body.content || !req.body.author || !req.body.category) {
            return res.status(400).send({ "message": "Please provide all the fields" });
        } else {
            const newBlog = {
                title: req.body.title,
                imgUrl: req.body.imgUrl,
                content: req.body.content,
                author: req.body.author,
                category: req.body.category
            }
            const blogCreated = await blog.create(newBlog);

            return res.status(201).send(blogCreated);
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).send({ "message": "Internal Server Error" });
    }
};

const updateBlog = async (req, res, id) => {
    try {
        if (!req.body.title || !req.body.imgUrl || !req.body.content || !req.body.author || !req.body.category) {
            return res.status(400).send({ "message": "Please provide all the fields" });
        } else {
            const id = req.params.id;
            const blogToUpdate = await blog.findById(id);

            const updatedBlog = {
                blogToUpdate,
                ...req.body
            };

            return res.status(200).send(updatedBlog);
        };
    } catch (error) {
        console.error(error.message);
        res.status(500).send({ "message": "Failed to update blog" });
    }
};

module.exports = { getBlogs, createBlog, updateBlog };