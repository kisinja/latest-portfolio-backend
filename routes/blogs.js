const express = require('express');
const { getBlogs, createBlog, updateBlog, getBlogById,getBlogsByCategory } = require("../controllers/blogs.js");

const upload = require("../utils/multerConfig");

const router = express.Router();

router.get("/", getBlogs);
router.post("/", upload.single('imgUrl'), createBlog);
router.put("/:id", updateBlog);
router.get("/:id", getBlogById);
router.get("/related", getBlogsByCategory);

module.exports = router;