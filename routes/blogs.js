const express = require('express');
const { getBlogs, createBlog } = require("../controllers/blogs.js");

const router = express.Router();

router.get("/blogs", getBlogs);
router.post("/blogs", createBlog);

module.exports = router;