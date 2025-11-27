import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);  
  const navigate = useNavigate();

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND}/api/freelancerBlog`);
      setBlogs(res.data);
    } catch (error) {
      console.error("Error fetching blogs:", error);
      toast.error("Failed to fetch blogs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);
  return (
    <>
      <div className="mb-10 p-8">
        <div className="flex  flex-col md:flex-row md:items-center mb-6">
         <span
     onClick={() => navigate(-1)}
      className="inline-flex items-center gap-2 px-3 py-1.5 
                 text-sm font-medium text-gray-700 bg-gray-100 
                 rounded-lg hover:bg-gray-200 hover:text-black 
                 transition-all cursor-pointer shadow-sm w-fit mb-2"
    >
      <FaArrowLeft className="text-xs" />
      Back
    </span>
          <h1 className="md:text-4xl text-2xl font-bold text-gray-900">
            Blog Management
          </h1>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : blogs.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-xl shadow-md">
            <p className="text-gray-500 text-xl">
              📝 No blogs yet. Create your first blog post!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((blog) => (
              <div
                key={blog._id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 relative"
              >
                <Link
                  to={`/blogDetails/${blog._id}`}
                  state={blog}
                  className="block"
                >
                  <div className="relative overflow-hidden h-52">
                    {blog.image ? (
                      <img
                        src={`${
                          import.meta.env.VITE_BACKEND
                        }/${blog.image.replace(/\\/g, "/")}`}
                        alt={blog.title}
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                        <span className="text-white text-6xl">📄</span>
                      </div>
                    )}
                    {blog.tags?.length > 0 && (
                      <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold bg-blue-600 text-white shadow-md">
                        {blog.tags[0] || "Blog"}
                      </span>
                    )}
                  </div>

                  <div className="p-5">
                    <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 hover:text-blue-600 transition">
                      {blog.title}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                      {blog.content
                        ? `${blog.content.replace(/<[^>]+>/g, "")}...`
                        : "No preview available"}
                    </p>

                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <time className="font-medium">
                        {new Date(blog.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </time>
                      <span className="text-blue-600 font-semibold">
                        Read More →
                      </span>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
      />
    </>
  );
};

export default Blog;
