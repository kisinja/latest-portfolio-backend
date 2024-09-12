const express = require('express');
const { getBlogs, createBlog, updateBlog, getBlogById } = require("../controllers/blogs.js");

const upload = require("../utils/multerConfig");

const router = express.Router();

router.get("/", getBlogs);
router.post("/", upload.single('imgUrl'), createBlog);
router.put("/:id", updateBlog);
router.get("/:id", getBlogById);

module.exports = router;