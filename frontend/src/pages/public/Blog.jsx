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
        <div className="py-8">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-slate-900 mb-4">Blog</h1>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Insights, tutorials, and stories from our team.
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
        <div className="py-8">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-slate-900 mb-4">Blog</h1>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Insights, tutorials, and stories from our team.
              </p>
            </div>
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <AlertCircle className="mx-auto text-4xl text-red-500 mb-4" />
                <p className="text-red-600 mb-4">{error}</p>
                <button 
                  onClick={fetchPosts}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
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
      <div className="py-8">
        <div className="max-w-7xl mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-slate-900 mb-4">Blog</h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Insights, tutorials, and stories from our team.
            </p>
          </div>

          {/* Filter Categories */}
          <div className="flex justify-center mb-8">
            <div className="flex space-x-2 bg-slate-100 rounded-lg p-1">
              {getCategories().map((category) => (
                <button
                  key={category}
                  onClick={() => setFilterCategory(category)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    filterCategory === category
                      ? 'bg-white text-slate-900 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
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
                  className="bg-white rounded-lg shadow-lg border border-slate-200 hover:shadow-xl transition-all duration-300 flex flex-col"
                >
                  <Link to={`/blog/${post.slug}`} className="block">
                    <img
                      src={post.featuredImage}
                      alt={post.title}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                  </Link>
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-xs font-semibold text-white bg-blue-600 px-2 py-1 rounded-full">
                        {post.category.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </span>
                      {post.isFeatured && (
                        <span className="text-xs font-semibold text-yellow-600 bg-yellow-100 px-2 py-1 rounded-full ml-2">Featured</span>
                      )}
                    </div>
                    <Link to={`/blog/${post.slug}`} className="hover:underline">
                      <h3 className="text-xl font-bold text-slate-900 mb-2 line-clamp-2">{post.title}</h3>
                    </Link>
                    <p className="text-slate-600 mb-4 line-clamp-3 flex-1">{post.excerpt}</p>
                    <div className="flex items-center justify-between text-xs text-slate-500 mt-auto">
                      <span>By {post.author?.name || "Unknown"}</span>
                      <span>{post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : ""}</span>
                    </div>
                    <Link
                      to={`/blog/${post.slug}`}
                      className="mt-4 inline-block text-blue-600 font-semibold hover:text-blue-700 transition-colors duration-200"
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
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Blog; 