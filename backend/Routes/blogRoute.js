const express = require('express');
const router = express.Router();
const upload = require("../multer");
const blogController = require('../Controllers/blogControllers');

// Routes (mount this router at /api/blogs)
router.post('/', upload.single('image'), blogController.createBlog);
router.get('/', blogController.getAllBlogs);
router.put('/:id', upload.single('image'), blogController.updateBlog);    // changed to '/:id'
router.delete('/:id', blogController.deleteBlog);                         // changed to '/:id'

module.exports = router;
