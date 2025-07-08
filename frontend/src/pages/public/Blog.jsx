import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { blogService } from "../../services/apiService";
import { Loader2, AlertCircle } from "lucide-react";
import Header from '../../components/Header';
import Footer from '../../components/Footer';

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

  if (loading) {
    return (
      <>
        <Header />
        <div className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 min-h-screen py-8 mt-10">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">Web Development Blog</h1>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Insights, tutorials, and stories from our web development team.
              </p>
            </div>
            <div className="flex items-center justify-center py-20">
              <Loader2 className="animate-spin text-4xl text-blue-600" />
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header />
        <div className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 min-h-screen py-8">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">Web Development Blog</h1>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Insights, tutorials, and stories from our web development team.
              </p>
            </div>
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <AlertCircle className="mx-auto text-4xl text-red-500 mb-4" />
                <p className="text-red-600 mb-4">{error}</p>
                <button 
                  onClick={fetchPosts}
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-2xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg"
                >
                  Try Again
                </button>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 min-h-screen py-8">
        <div className="max-w-7xl mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">Web Development Blog</h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Insights, tutorials, and stories from our web development team.
            </p>
          </div>

          {/* Filter Categories */}
          <div className="flex justify-center mb-8">
            <div className="flex space-x-2 bg-white rounded-2xl p-2 shadow-lg border border-slate-100">
              {getCategories().map((category) => (
                <button
                  key={category}
                  onClick={() => setFilterCategory(category)}
                  className={`px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                    filterCategory === category
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg'
                      : 'text-slate-600 hover:text-slate-800 hover:bg-slate-50'
                  }`}
                >
                  {category === "all" ? "All Posts" : category.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </button>
              ))}
            </div>
          </div>

          {/* Blog Grid */}
          {filteredPosts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {filteredPosts.map((post) => (
                <div
                  key={post._id}
                  className="bg-white rounded-3xl shadow-lg border border-slate-100 hover:shadow-xl transition-all duration-300 flex flex-col transform hover:-translate-y-2"
                >
                  <Link to={`/blog/${post.slug}`} className="block">
                    <img
                      src={post.featuredImage}
                      alt={post.title}
                      className="w-full h-48 object-cover rounded-t-3xl"
                    />
                  </Link>
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center space-x-2 mb-3">
                      <span className="text-xs font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 px-3 py-1 rounded-full shadow-lg">
                        {post.category.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </span>
                      {post.isFeatured && (
                        <span className="text-xs font-semibold text-yellow-600 bg-gradient-to-r from-yellow-100 to-orange-100 px-3 py-1 rounded-full ml-2 shadow-lg">Featured</span>
                      )}
                    </div>
                    <Link to={`/blog/${post.slug}`} className="hover:underline">
                      <h3 className="text-xl font-bold text-slate-800 mb-3 line-clamp-2">{post.title}</h3>
                    </Link>
                    <p className="text-slate-600 mb-4 line-clamp-3 flex-1 leading-relaxed">{post.excerpt}</p>
                    <div className="flex items-center justify-between text-xs text-slate-500 mt-auto mb-3">
                      <span className="font-medium">By {post.author?.name || "Unknown"}</span>
                      <span>{post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : ""}</span>
                    </div>
                    <Link
                      to={`/blog/${post.slug}`}
                      className="mt-2 inline-block text-blue-600 font-semibold hover:text-blue-700 transition-colors duration-200 flex items-center"
                    >
                      Read More →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <AlertCircle className="mx-auto text-4xl text-slate-400 mb-4" />
              <p className="text-slate-600">No blog posts found in this category.</p>
            </div>
          )}

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white rounded-3xl p-8 text-center shadow-2xl">
            <h2 className="text-3xl font-bold mb-4">Stay Updated with Web Development Trends</h2>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto text-lg">
              Subscribe to our newsletter for the latest web development insights, tutorials, and industry updates.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-2xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <button className="bg-white text-blue-600 px-6 py-3 rounded-2xl font-semibold hover:bg-blue-50 transition-all duration-300 shadow-lg">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Blog; 