import React, { useState, useEffect } from "react";
import { blogService } from "../../services/apiService";

const Blog = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const [newPost, setNewPost] = useState({
    title: "",
    excerpt: "",
    content: "",
    featuredImage: "",
    category: "",
    tags: [],
    status: "draft",
    isFeatured: false,
    isPublished: false,
    seo: {
      metaTitle: "",
      metaDescription: "",
      keywords: []
    }
  });

  const statusOptions = ["draft", "published", "archived"];
  const categoryOptions = ["web-development", "mobile-development", "ui-ux-design", "digital-marketing", "technology", "business"];

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await blogService.getAllBlogPosts();
        setBlogPosts(Array.isArray(response.data.data) ? response.data.data : []);
      } catch (err) {
        console.error('Error fetching blog posts:', err);
        setError('Failed to load blog posts. Please try again.');
        setBlogPosts([]); // Defensive fallback
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPosts();
  }, []);

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.content?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = selectedStatus === "all" || post.status === selectedStatus;
    const matchesCategory = selectedCategory === "all" || post.category === selectedCategory;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const handleAddPost = async () => {
    try {
      await blogService.createBlogPost(newPost);
      setShowAddModal(false);
      setNewPost({
        title: "",
        excerpt: "",
        content: "",
        featuredImage: "",
        category: "",
        tags: [],
        status: "draft",
        isFeatured: false,
        isPublished: false,
        seo: {
          metaTitle: "",
          metaDescription: "",
          keywords: []
        }
      });
      // Refresh the blog posts list
      const response = await blogService.getAllBlogPosts();
      setBlogPosts(Array.isArray(response.data.data) ? response.data.data : []);
      alert('Blog post added successfully!');
    } catch (err) {
      console.error('Error adding blog post:', err);
      alert('Failed to add blog post. Please try again.');
    }
  };

  const handleEditPost = async () => {
    try {
      await blogService.updateBlogPost(selectedPost._id, selectedPost);
      setShowEditModal(false);
      setSelectedPost(null);
      // Refresh the blog posts list
      const response = await blogService.getAllBlogPosts();
      setBlogPosts(Array.isArray(response.data.data) ? response.data.data : []);
      alert('Blog post updated successfully!');
    } catch (err) {
      console.error('Error updating blog post:', err);
      alert('Failed to update blog post. Please try again.');
    }
  };

  const handleDeletePost = async (id) => {
    if (window.confirm("Are you sure you want to delete this blog post?")) {
      try {
        await blogService.deleteBlogPost(id);
        setBlogPosts(blogPosts.filter(post => post._id !== id));
        alert('Blog post deleted successfully!');
      } catch (err) {
        console.error('Error deleting blog post:', err);
        alert('Failed to delete blog post. Please try again.');
      }
    }
  };

  const handleToggleFeatured = async (id, currentStatus) => {
    try {
      await blogService.toggleFeatured(id);
      setBlogPosts(blogPosts.map(post => 
        post._id === id ? { ...post, isFeatured: !currentStatus } : post
      ));
    } catch (err) {
      console.error('Error toggling featured status:', err);
      alert('Failed to update featured status. Please try again.');
    }
  };

  const handleTogglePublish = async (id, currentStatus) => {
    try {
      await blogService.togglePublish(id);
      setBlogPosts(blogPosts.map(post => 
        post._id === id ? { ...post, isPublished: !currentStatus } : post
      ));
    } catch (err) {
      console.error('Error toggling publish status:', err);
      alert('Failed to update publish status. Please try again.');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "published": return "bg-green-100 text-green-800";
      case "draft": return "bg-yellow-100 text-yellow-800";
      case "archived": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case "web-development": return "bg-blue-100 text-blue-800";
      case "mobile-development": return "bg-purple-100 text-purple-800";
      case "ui-ux-design": return "bg-pink-100 text-pink-800";
      case "digital-marketing": return "bg-green-100 text-green-800";
      case "technology": return "bg-indigo-100 text-indigo-800";
      case "business": return "bg-orange-100 text-orange-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const stats = {
    total: blogPosts.length,
    published: blogPosts.filter(p => p.status === "published").length,
    draft: blogPosts.filter(p => p.status === "draft").length,
    featured: blogPosts.filter(p => p.isFeatured).length,
    archived: blogPosts.filter(p => p.status === "archived").length,
    totalViews: blogPosts.reduce((sum, p) => sum + (p.views || 0), 0)
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading blog posts...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="text-red-500 text-4xl mb-4">⚠️</div>
          <p className="text-red-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

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
              <p className="text-2xl font-bold text-yellow-600">{stats.draft}</p>
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
              {categoryOptions.map(category => (
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
        {filteredPosts.map((post) => (
          <div key={post._id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
            <div className="aspect-video bg-gray-200">
              <img 
                src={post.featuredImage} 
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                  post.isPublished 
                    ? "bg-green-100 text-green-800" 
                    : "bg-yellow-100 text-yellow-800"
                }`}>
                  {post.isPublished ? "Published" : "Draft"}
                </span>
                <span className="text-xs text-gray-500">{post.date}</span>
              </div>
              
              <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                {post.title}
              </h3>
              
              <p className="text-sm text-gray-600 mb-3 line-clamp-3">
                {post.excerpt}
              </p>
              
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-gray-500">By {post.author}</span>
                <span className="text-sm text-gray-500">{post.category}</span>
              </div>
              
              <div className="flex flex-wrap gap-1 mb-4">
                {post.tags.slice(0, 3).map((tag, index) => (
                  <span key={index} className="inline-flex px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                    {tag}
                  </span>
                ))}
                {post.tags.length > 3 && (
                  <span className="inline-flex px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full">
                    +{post.tags.length - 3}
                  </span>
                )}
              </div>
              
              <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                <span>👁️ {post.views || 0} views</span>
                <span>❤️ {post.likes || 0} likes</span>
              </div>
              
              <div className="flex space-x-2">
                <button
                  onClick={() => {
                    setSelectedPost(post);
                    setShowEditModal(true);
                  }}
                  className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                >
                  ✏️ Edit
                </button>
                <button
                  onClick={() => handleDeletePost(post._id)}
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
              {showEditModal ? "Edit Blog Post" : "Write New Blog Post"}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Post Title
                </label>
                <input
                  type="text"
                  value={newPost.title}
                  onChange={(e) => setNewPost({...newPost, title: e.target.value})}
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
                  value={newPost.author}
                  onChange={(e) => setNewPost({...newPost, author: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter author name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  value={newPost.category}
                  onChange={(e) => setNewPost({...newPost, category: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {categoryOptions.map(category => (
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
                  value={newPost.featuredImage}
                  onChange={(e) => setNewPost({...newPost, featuredImage: e.target.value})}
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
                  value={newPost.tags.join(', ')}
                  onChange={(e) => setNewPost({...newPost, tags: e.target.value.split(',').map(tag => tag.trim())})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., React, JavaScript, Web Development"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Content
                </label>
                <textarea
                  value={newPost.content}
                  onChange={(e) => setNewPost({...newPost, content: e.target.value})}
                  rows={8}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Write your blog post content here..."
                />
              </div>

              <div className="md:col-span-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={newPost.isPublished}
                    onChange={(e) => setNewPost({...newPost, isPublished: e.target.checked})}
                    className="mr-2"
                  />
                  <span className="text-sm font-medium text-gray-700">Publish immediately</span>
                </label>
              </div>
            </div>

            <div className="flex space-x-3 mt-6">
              <button
                onClick={showEditModal ? handleEditPost : handleAddPost}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                {showEditModal ? "Update" : "Publish"} Post
              </button>
              <button
                onClick={() => {
                  setShowAddModal(false);
                  setShowEditModal(false);
                  setSelectedPost(null);
                  setNewPost({
                    title: "",
                    excerpt: "",
                    content: "",
                    featuredImage: "",
                    category: "",
                    tags: [],
                    status: "draft",
                    isFeatured: false,
                    isPublished: false,
                    seo: {
                      metaTitle: "",
                      metaDescription: "",
                      keywords: []
                    }
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