const express = require('express');
const { getBlogs, createBlog, updateBlog } = require("../controllers/blogs.js");

const router = express.Router();

router.get("/blogs", getBlogs);
router.post("/blogs", createBlog);
router.put("/blogs/:id", updateBlog);

module.exports = router;