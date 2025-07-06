import React, { useState } from "react";

const Blog = () => {
  const [blogs, setBlogs] = useState([
    {
      id: 1,
      title: "Getting Started with MERN Stack Development",
      author: "John Doe",
      date: "2024-01-15",
      published: true,
      category: "Development",
      tags: ["MERN", "JavaScript", "React"],
      content: "MERN stack is a popular JavaScript framework for building web applications...",
      image: "https://via.placeholder.com/300x200",
      views: 1250,
      likes: 45
    },
    {
      id: 2,
      title: "Best Practices for UI/UX Design in 2024",
      author: "Jane Smith",
      date: "2024-01-12",
      published: true,
      category: "Design",
      tags: ["UI/UX", "Design", "Trends"],
      content: "User experience design has evolved significantly over the years...",
      image: "https://via.placeholder.com/300x200",
      views: 890,
      likes: 32
    },
    {
      id: 3,
      title: "The Future of Web Development",
      author: "Mike Johnson",
      date: "2024-01-10",
      published: false,
      category: "Technology",
      tags: ["Web Development", "Future", "AI"],
      content: "As we move forward in 2024, web development continues to evolve...",
      image: "https://via.placeholder.com/300x200",
      views: 0,
      likes: 0
    }
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");

  const [newBlog, setNewBlog] = useState({
    title: "",
    author: "",
    category: "Development",
    tags: "",
    content: "",
    image: "",
    published: false
  });

  const categories = ["Development", "Design", "Technology", "Business", "Tutorials"];
  const statusOptions = ["Published", "Draft"];

  const filteredBlogs = blogs.filter(blog => {
    const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         blog.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         blog.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || blog.category === selectedCategory;
    const matchesStatus = selectedStatus === "all" || 
                         (selectedStatus === "Published" && blog.published) ||
                         (selectedStatus === "Draft" && !blog.published);
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleAddBlog = () => {
    if (newBlog.title && newBlog.author && newBlog.content) {
      const blog = {
        id: blogs.length + 1,
        ...newBlog,
        date: new Date().toISOString().split('T')[0],
        tags: newBlog.tags.split(',').map(tag => tag.trim()),
        views: 0,
        likes: 0
      };
      setBlogs([...blogs, blog]);
      setNewBlog({
        title: "",
        author: "",
        category: "Development",
        tags: "",
        content: "",
        image: "",
        published: false
      });
      setShowAddModal(false);
    }
  };

  const handleEditBlog = (blog) => {
    setEditingBlog(blog);
    setNewBlog({
      title: blog.title,
      author: blog.author,
      category: blog.category,
      tags: blog.tags.join(', '),
      content: blog.content,
      image: blog.image,
      published: blog.published
    });
    setShowAddModal(true);
  };

  const handleUpdateBlog = () => {
    if (editingBlog && newBlog.title && newBlog.author && newBlog.content) {
      setBlogs(blogs.map(b => 
        b.id === editingBlog.id 
          ? { 
              ...b, 
              ...newBlog,
              tags: newBlog.tags.split(',').map(tag => tag.trim())
            }
          : b
      ));
      setNewBlog({
        title: "",
        author: "",
        category: "Development",
        tags: "",
        content: "",
        image: "",
        published: false
      });
      setEditingBlog(null);
      setShowAddModal(false);
    }
  };

  const handleDeleteBlog = (id) => {
    if (window.confirm("Are you sure you want to delete this blog post?")) {
      setBlogs(blogs.filter(b => b.id !== id));
    }
  };

  const stats = {
    total: blogs.length,
    published: blogs.filter(b => b.published).length,
    drafts: blogs.filter(b => !b.published).length,
    totalViews: blogs.reduce((sum, b) => sum + b.views, 0)
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Blog Management</h1>
          <p className="text-gray-600">Manage your blog posts and content</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <span>✍️</span>
          <span>Write New Post</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Posts</p>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl">📝</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Published</p>
              <p className="text-2xl font-bold text-green-600">{stats.published}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl">✅</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Drafts</p>
              <p className="text-2xl font-bold text-yellow-600">{stats.drafts}</p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl">📄</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Views</p>
              <p className="text-2xl font-bold text-purple-600">{stats.totalViews.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl">👁️</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <input
              type="text"
              placeholder="Search posts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
          <div>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Status</option>
              {statusOptions.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>
          <div>
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("all");
                setSelectedStatus("all");
              }}
              className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              🔄 Clear Filters
            </button>
          </div>
        </div>
      </div>

      {/* Blog Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBlogs.map((blog) => (
          <div key={blog.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
            <div className="aspect-video bg-gray-200">
              <img 
                src={blog.image} 
                alt={blog.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                  blog.published 
                    ? "bg-green-100 text-green-800" 
                    : "bg-yellow-100 text-yellow-800"
                }`}>
                  {blog.published ? "Published" : "Draft"}
                </span>
                <span className="text-xs text-gray-500">{blog.date}</span>
              </div>
              
              <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                {blog.title}
              </h3>
              
              <p className="text-sm text-gray-600 mb-3 line-clamp-3">
                {blog.content}
              </p>
              
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-gray-500">By {blog.author}</span>
                <span className="text-sm text-gray-500">{blog.category}</span>
              </div>
              
              <div className="flex flex-wrap gap-1 mb-4">
                {blog.tags.slice(0, 3).map((tag, index) => (
                  <span key={index} className="inline-flex px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                    {tag}
                  </span>
                ))}
                {blog.tags.length > 3 && (
                  <span className="inline-flex px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full">
                    +{blog.tags.length - 3}
                  </span>
                )}
              </div>
              
              <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                <span>👁️ {blog.views} views</span>
                <span>❤️ {blog.likes} likes</span>
              </div>
              
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEditBlog(blog)}
                  className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                >
                  ✏️ Edit
                </button>
                <button
                  onClick={() => handleDeleteBlog(blog.id)}
                  className="flex-1 px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
                >
                  🗑️ Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {editingBlog ? "Edit Blog Post" : "Write New Blog Post"}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Post Title
                </label>
                <input
                  type="text"
                  value={newBlog.title}
                  onChange={(e) => setNewBlog({...newBlog, title: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter post title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Author
                </label>
                <input
                  type="text"
                  value={newBlog.author}
                  onChange={(e) => setNewBlog({...newBlog, author: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter author name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  value={newBlog.category}
                  onChange={(e) => setNewBlog({...newBlog, category: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Featured Image URL
                </label>
                <input
                  type="url"
                  value={newBlog.image}
                  onChange={(e) => setNewBlog({...newBlog, image: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter image URL"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tags (comma separated)
                </label>
                <input
                  type="text"
                  value={newBlog.tags}
                  onChange={(e) => setNewBlog({...newBlog, tags: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., React, JavaScript, Web Development"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Content
                </label>
                <textarea
                  value={newBlog.content}
                  onChange={(e) => setNewBlog({...newBlog, content: e.target.value})}
                  rows={8}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Write your blog post content here..."
                />
              </div>

              <div className="md:col-span-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={newBlog.published}
                    onChange={(e) => setNewBlog({...newBlog, published: e.target.checked})}
                    className="mr-2"
                  />
                  <span className="text-sm font-medium text-gray-700">Publish immediately</span>
                </label>
              </div>
            </div>

            <div className="flex space-x-3 mt-6">
              <button
                onClick={editingBlog ? handleUpdateBlog : handleAddBlog}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                {editingBlog ? "Update" : "Publish"} Post
              </button>
              <button
                onClick={() => {
                  setShowAddModal(false);
                  setEditingBlog(null);
                  setNewBlog({
                    title: "",
                    author: "",
                    category: "Development",
                    tags: "",
                    content: "",
                    image: "",
                    published: false
                  });
                }}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Blog;