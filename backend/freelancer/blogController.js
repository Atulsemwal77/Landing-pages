const Blog = require('../freelancer/blogModal');
const fs = require('fs').promises;
const path = require('path');

// helper to build stored image path (consistent)
function storedImagePath(file) {
  // store relative path under uploads/ so it works with static serving
  return file ? `uploads/${file.filename}` : null;
}

// Create Blog
exports.createBlog = async (req, res) => {
  try {
    const { title, date, author, tags, content } = req.body;

    const blog = new Blog({
      title,
      date: date ? new Date(date) : new Date(),
      author,
      tags: tags ? tags.split(',').map(tag => tag.trim()).filter(Boolean) : [],
      content,
      image: req.file ? storedImagePath(req.file) : null,
    });

    await blog.save();
    res.status(201).json({ message: 'Blog uploaded successfully', blog });
  } catch (error) {
    console.error('Error saving blog:', error);
    res.status(500).json({ message: 'Failed to upload blog', error: error.message });
  }
};

// Get All Blogs
exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.status(200).json(blogs);
  } catch (error) {
    console.error('Error fetching blogs:', error);
    res.status(500).json({ message: 'Failed to fetch blogs', error: error.message });
  }
};

// Update Blog (handles image replace + old image deletion)
exports.updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, date, author, tags, content } = req.body;

    const blog = await Blog.findById(id);
    if (!blog) return res.status(404).json({ message: 'Blog not found' });

    // If new file uploaded, delete old image (if any) and set new path
    if (req.file) {
      if (blog.image) {
        const oldImagePath = path.join(__dirname, "..", blog.image);
        try {
          await fs.unlink(oldImagePath);
        } catch (err) {
          if (err.code !== 'ENOENT') console.error('Error deleting old image:', err);
        }
      }
      blog.image = storedImagePath(req.file);
    }

    // Update other fields
    blog.title = title ?? blog.title;
    blog.date = date ? new Date(date) : blog.date;
    blog.author = author ?? blog.author;
    blog.tags = tags ? tags.split(',').map(t => t.trim()).filter(Boolean) : blog.tags;
    blog.content = content ?? blog.content;

    const updatedBlog = await blog.save();
    res.status(200).json({ message: 'Blog updated successfully', blog: updatedBlog });
  } catch (error) {
    console.error('Error updating blog:', error);
    res.status(500).json({ message: 'Failed to update blog', error: error.message });
  }
};

exports.deleteBlog = async (req, res) => {
  try {
    const deleted = await Blog.findOneAndDelete({ _id: req.params.id });
    if (!deleted) return res.status(404).json({ message: 'Blog not found' });
    res.status(200).json({ message: "Blog and image deleted successfully" });
  } catch (error) {
    console.error("Error deleting blog:", error);
    res.status(500).json({ message: "Failed to delete blog", error: error.message });
  }
};
