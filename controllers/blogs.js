const Blog = require("../models/Blog");

const getBlogs = async (req, res) => {
    const qNew = req.query.new;
    const qCategory = req.query.category;
    try {
        let blogs;

        if (qNew) {
            blogs = await Blog.find().sort({ createdAt: -1 });
        } else if (qCategory) {
            blogs = await Blog.find({
                category: {
                    $in: [qCategory],
                },
            });
        } else {
            blogs = await Blog.find().limit(3);
        }

        res.status(200).json(blogs);
    } catch (error) {
        console.error(error.message);
        res.status(500).send({ "error": error.message });
    }
};

const createBlog = async (req, res) => {
    try {
        const { title, content, author, category } = req.body;
        const imgUrl = req.file ? req.file.path : req.body.imgUrl;

        if (!title || !imgUrl || !content || !author || !category) {
            return res.status(400).send({ error: "Please provide all the fields" });
        }

        const newBlog = {
            title,
            imgUrl,
            content,
            author,
            category
        };

        const blogCreated = await Blog.create(newBlog);

        return res.status(201).json({ blog: blogCreated });
    } catch (error) {
        console.error(error.message);
        return res.status(500).send({ error: error.message });
    }
};

const updateBlog = async (req, res, id) => {
    try {
        if (!req.body.title || !req.body.imgUrl || !req.body.content || !req.body.author || !req.body.category) {
            return res.status(400).send({ "message": "Please provide all the fields" });
        } else {
            const id = req.params.id;
            const blogToUpdate = await Blog.findById(id);

            const updatedBlog = {
                blogToUpdate,
                ...req.body
            };

            return res.status(200).send(updatedBlog);
        };
    } catch (error) {
        console.error(error.message);
        return res.status(500).send({ error: error.message });
    }
};

const getBlogById = async (req, res) => {
    const blogId = req.params.id;
    try {
        const blog = await Blog.findById(blogId);
        if (!blog) {
            return res.json({ error: "No such blog was found" }).status(400);
        }

        res.status(200).json(blog);
    } catch (error) {
        console.error(error.message);
        return res.status(500).send({ error: error.message });
    }
};

const getBlogsByCategory = async (req, res) => {
    const category = req.query.category; // Get the category from query parameters

    if (!category) {
        return res.status(400).json({ error: "Category query parameter is required" });
    }

    try {
        const blogs = await Blog.find({ category: category });
        if (blogs.length === 0) {
            return res.status(404).json({ message: "No blogs found for the specified category" });
        }

        return res.status(200).json(blogs);
    } catch (error) {
        console.error(error.message);
        return res.status(500).send({ error: error.message });
    }
};

module.exports = { getBlogs, createBlog, updateBlog, getBlogById, getBlogsByCategory };