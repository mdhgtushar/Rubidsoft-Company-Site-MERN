const Blog = require('./blog.model');
const { validationRules, validate, sanitizeInput } = require('../../utils/validateInput');

// @desc    Get all blog posts
// @route   GET /api/blog
// @access  Public
const getAllBlogPosts = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      category,
      featured,
      published,
      search,
      sort = '-publishedAt'
    } = req.query;

    // Build query
    const query = {};

    if (category) {
      query.category = category;
    }

    if (featured !== undefined) {
      query.isFeatured = featured === 'true';
    }

    if (published !== undefined) {
      query.isPublished = published === 'true';
    } else {
      // Default to published posts for public access
      query.isPublished = true;
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { excerpt: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } }
      ];
    }

    // Execute query with pagination
    const posts = await Blog.find(query)
      .populate('author', 'name email')
      .populate('createdBy', 'name email')
      .sort(sort)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    // Get total count
    const total = await Blog.countDocuments(query);

    res.status(200).json({
      success: true,
      data: {
        posts,
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(total / limit),
          totalItems: total,
          itemsPerPage: parseInt(limit)
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching blog posts',
      error: error.message
    });
  }
};

// @desc    Get single blog post by slug
// @route   GET /api/blog/:slug
// @access  Public
const getBlogPostBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    const post = await Blog.findOne({ slug, isPublished: true })
      .populate('author', 'name email')
      .populate('createdBy', 'name email')
      .populate('updatedBy', 'name email')
      .populate('relatedPosts', 'title slug excerpt featuredImage publishedAt');

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Blog post not found'
      });
    }

    // Increment views
    post.views += 1;
    await post.save();

    res.status(200).json({
      success: true,
      data: post
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching blog post',
      error: error.message
    });
  }
};

// @desc    Create new blog post
// @route   POST /api/blog
// @access  Private (Admin only)
const createBlogPost = async (req, res) => {
  try {
    const postData = {
      ...req.body,
      author: req.user.id,
      createdBy: req.user.id
    };

    const post = await Blog.create(postData);

    res.status(201).json({
      success: true,
      message: 'Blog post created successfully',
      data: post
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Blog post with this slug already exists'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Error creating blog post',
      error: error.message
    });
  }
};

// @desc    Update blog post
// @route   PUT /api/blog/:id
// @access  Private (Admin only)
const updateBlogPost = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = {
      ...req.body,
      updatedBy: req.user.id
    };

    const post = await Blog.findByIdAndUpdate(
      id,
      updateData,
      {
        new: true,
        runValidators: true
      }
    )
      .populate('author', 'name email')
      .populate('createdBy', 'name email')
      .populate('updatedBy', 'name email')
      .populate('relatedPosts', 'title slug excerpt featuredImage publishedAt');

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Blog post not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Blog post updated successfully',
      data: post
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Blog post with this slug already exists'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Error updating blog post',
      error: error.message
    });
  }
};

// @desc    Delete blog post
// @route   DELETE /api/blog/:id
// @access  Private (Admin only)
const deleteBlogPost = async (req, res) => {
  try {
    const { id } = req.params;

    const post = await Blog.findByIdAndDelete(id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Blog post not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Blog post deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting blog post',
      error: error.message
    });
  }
};

// @desc    Get featured blog posts
// @route   GET /api/blog/featured
// @access  Public
const getFeaturedBlogPosts = async (req, res) => {
  try {
    const { limit = 6 } = req.query;

    const posts = await Blog.find({ 
      isFeatured: true, 
      isPublished: true 
    })
      .populate('author', 'name email')
      .sort('-publishedAt')
      .limit(parseInt(limit));

    res.status(200).json({
      success: true,
      data: posts
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching featured blog posts',
      error: error.message
    });
  }
};

// @desc    Get blog posts by category
// @route   GET /api/blog/category/:category
// @access  Public
const getBlogPostsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const { page = 1, limit = 10 } = req.query;

    const posts = await Blog.find({ 
      category, 
      isPublished: true 
    })
      .populate('author', 'name email')
      .sort('-publishedAt')
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const total = await Blog.countDocuments({ 
      category, 
      isPublished: true 
    });

    res.status(200).json({
      success: true,
      data: {
        posts,
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(total / limit),
          totalItems: total,
          itemsPerPage: parseInt(limit)
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching blog posts by category',
      error: error.message
    });
  }
};

// @desc    Add comment to blog post
// @route   POST /api/blog/:id/comments
// @access  Public
const addComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, comment } = req.body;

    const post = await Blog.findById(id);
    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Blog post not found'
      });
    }

    post.comments.push({
      name,
      email,
      comment
    });

    await post.save();

    res.status(200).json({
      success: true,
      message: 'Comment added successfully',
      data: post
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error adding comment',
      error: error.message
    });
  }
};

// @desc    Approve/Reject comment
// @route   PATCH /api/blog/:id/comments/:commentId
// @access  Private (Admin only)
const updateCommentStatus = async (req, res) => {
  try {
    const { id, commentId } = req.params;
    const { isApproved } = req.body;

    const post = await Blog.findById(id);
    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Blog post not found'
      });
    }

    const comment = post.comments.id(commentId);
    if (!comment) {
      return res.status(404).json({
        success: false,
        message: 'Comment not found'
      });
    }

    comment.isApproved = isApproved;
    await post.save();

    res.status(200).json({
      success: true,
      message: `Comment ${isApproved ? 'approved' : 'rejected'} successfully`,
      data: post
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating comment status',
      error: error.message
    });
  }
};

// @desc    Get blog statistics
// @route   GET /api/blog/stats
// @access  Private (Admin only)
const getBlogStats = async (req, res) => {
  try {
    const stats = await Blog.aggregate([
      {
        $group: {
          _id: null,
          totalPosts: { $sum: 1 },
          publishedPosts: {
            $sum: { $cond: ['$isPublished', 1, 0] }
          },
          featuredPosts: {
            $sum: { $cond: ['$isFeatured', 1, 0] }
          },
          totalViews: { $sum: '$views' },
          totalLikes: { $sum: '$likes' },
          totalComments: { $sum: { $size: '$comments' } }
        }
      }
    ]);

    const categoryStats = await Blog.aggregate([
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 },
          totalViews: { $sum: '$views' }
        }
      },
      { $sort: { count: -1 } }
    ]);

    const monthlyStats = await Blog.aggregate([
      {
        $match: { isPublished: true }
      },
      {
        $group: {
          _id: {
            year: { $year: '$publishedAt' },
            month: { $month: '$publishedAt' }
          },
          count: { $sum: 1 },
          totalViews: { $sum: '$views' }
        }
      },
      { $sort: { '_id.year': -1, '_id.month': -1 } },
      { $limit: 12 }
    ]);

    res.status(200).json({
      success: true,
      data: {
        overview: stats[0] || {
          totalPosts: 0,
          publishedPosts: 0,
          featuredPosts: 0,
          totalViews: 0,
          totalLikes: 0,
          totalComments: 0
        },
        byCategory: categoryStats,
        monthly: monthlyStats
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching blog statistics',
      error: error.message
    });
  }
};

// @desc    Toggle blog post featured status
// @route   PATCH /api/blog/:id/toggle-featured
// @access  Private (Admin only)
const toggleFeatured = async (req, res) => {
  try {
    const { id } = req.params;

    const post = await Blog.findById(id);
    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Blog post not found'
      });
    }

    post.isFeatured = !post.isFeatured;
    post.updatedBy = req.user.id;
    await post.save();

    res.status(200).json({
      success: true,
      message: `Blog post ${post.isFeatured ? 'featured' : 'unfeatured'} successfully`,
      data: post
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error toggling featured status',
      error: error.message
    });
  }
};

// @desc    Publish/Unpublish blog post
// @route   PATCH /api/blog/:id/publish
// @access  Private (Admin only)
const togglePublish = async (req, res) => {
  try {
    const { id } = req.params;

    const post = await Blog.findById(id);
    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Blog post not found'
      });
    }

    post.isPublished = !post.isPublished;
    post.status = post.isPublished ? 'published' : 'draft';
    post.updatedBy = req.user.id;
    
    if (post.isPublished && !post.publishedAt) {
      post.publishedAt = new Date();
    }

    await post.save();

    res.status(200).json({
      success: true,
      message: `Blog post ${post.isPublished ? 'published' : 'unpublished'} successfully`,
      data: post
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error toggling publish status',
      error: error.message
    });
  }
};

module.exports = {
  getAllBlogPosts,
  getBlogPostBySlug,
  createBlogPost,
  updateBlogPost,
  deleteBlogPost,
  getFeaturedBlogPosts,
  getBlogPostsByCategory,
  addComment,
  updateCommentStatus,
  getBlogStats,
  toggleFeatured,
  togglePublish
}; 