import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { blogService } from "../../services/apiService";
import { Loader2, AlertCircle, Calendar, User, ArrowRight } from "lucide-react";

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await blogService.getAllBlogPosts({ isPublished: true, limit: 24 });
      setPosts(response.data.data.blogs || []);
    } catch (err) {
      setError("Failed to load blog posts. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const getCategories = () => {
    const categories = [...new Set(posts.map(post => post.category))];
    return ["all", ...categories.filter(Boolean)];
  };

  const filteredPosts = filterCategory === "all"
    ? posts
    : posts.filter(post => post.category === filterCategory);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="bg-gray-50 min-h-screen py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Enterprise Development Blog</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Insights, tutorials, and stories from our enterprise development team.
            </p>
          </div>
          <div className="flex items-center justify-center py-20">
            <Loader2 className="animate-spin text-4xl text-blue-600" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gray-50 min-h-screen py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Enterprise Development Blog</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Insights, tutorials, and stories from our enterprise development team.
            </p>
          </div>
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <AlertCircle className="mx-auto text-4xl text-red-500 mb-4" />
              <p className="text-red-600 mb-4">{error}</p>
              <button 
                onClick={fetchPosts}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors shadow-lg"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white py-16 rounded-xl overflow-hidden mb-16 mx-4 shadow-lg">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            Enterprise Development Blog
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-4xl mx-auto leading-relaxed">
            Insights, tutorials, and stories from our enterprise development team. 
            Stay updated with the latest trends and best practices.
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="mb-16 mx-4">
        <div className="px-6">
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Filter by Category</h2>
            <div className="flex flex-wrap justify-center gap-3">
              {getCategories().map((category) => (
                <button
                  key={category}
                  onClick={() => setFilterCategory(category)}
                  className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                    filterCategory === category
                      ? "bg-blue-600 text-white shadow-md"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {category === "all" ? "All Posts" : category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="mb-16 mx-4">
        <div className="px-6">
          {filteredPosts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <article
                  key={post._id}
                  className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-500 hover:-translate-y-2 shadow-lg"
                >
                  {/* Post Image */}
                  <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                    {post.image ? (
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="text-center text-gray-500">
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center mx-auto mb-2">
                          <span className="text-white text-2xl">📝</span>
                        </div>
                        <p className="text-sm">Blog Post</p>
                      </div>
                    )}
                  </div>

                  {/* Post Content */}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                        {post.category}
                      </span>
                      {post.featured && (
                        <span className="text-xs font-medium text-yellow-600 bg-yellow-50 px-2 py-1 rounded-full">
                          Featured
                        </span>
                      )}
                    </div>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
                      {post.title}
                    </h3>

                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {post.excerpt || post.content?.substring(0, 150) + "..."}
                    </p>

                    {/* Post Meta */}
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {formatDate(post.createdAt)}
                      </div>
                      {post.author && (
                        <div className="flex items-center">
                          <User className="w-4 h-4 mr-1" />
                          {post.author}
                        </div>
                      )}
                    </div>

                    {/* Read More Button */}
                    <Link
                      to={`/blog/${post.slug}`}
                      className="inline-flex items-center text-blue-600 font-medium hover:text-blue-700 transition-colors group"
                    >
                      <span className="group-hover:translate-x-1 transition-transform duration-300">Read More</span>
                      <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-300" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🔍</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Posts Found</h3>
              <p className="text-gray-600">No blog posts match the selected category.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl mx-4 shadow-lg">
        <div className="px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Stay Updated with Our Insights
          </h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8 leading-relaxed">
            Get the latest enterprise development insights, tutorials, and industry 
            trends delivered to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Subscribe to Newsletter
            </Link>
            <Link
              to="/services"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              View Our Services
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog; 