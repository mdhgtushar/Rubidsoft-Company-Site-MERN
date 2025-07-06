const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true,
    maxlength: [100, 'Name cannot be more than 100 characters']
  },
  slug: {
    type: String,
    required: [true, 'Product slug is required'],
    unique: true,
    lowercase: true,
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Product description is required']
  },
  shortDescription: {
    type: String,
    required: [true, 'Short description is required'],
    maxlength: [200, 'Short description cannot be more than 200 characters']
  },
  category: {
    type: String,
    required: [true, 'Product category is required'],
    enum: ['software', 'template', 'plugin', 'theme', 'api', 'service', 'other']
  },
  type: {
    type: String,
    enum: ['digital', 'physical', 'service'],
    default: 'digital'
  },
  price: {
    amount: {
      type: Number,
      required: [true, 'Product price is required'],
      min: 0
    },
    currency: {
      type: String,
      default: 'USD'
    },
    originalPrice: {
      type: Number,
      min: 0
    },
    discount: {
      type: Number,
      min: 0,
      max: 100,
      default: 0
    }
  },
  images: {
    main: {
      type: String,
      required: [true, 'Main product image is required']
    },
    gallery: [String],
    screenshots: [String]
  },
  features: [{
    title: String,
    description: String,
    icon: String
  }],
  specifications: [{
    name: String,
    value: String
  }],
  requirements: {
    system: [String],
    dependencies: [String],
    version: String
  },
  downloads: {
    file: String,
    size: Number,
    version: String,
    releaseDate: Date,
    downloadCount: {
      type: Number,
      default: 0
    }
  },
  license: {
    type: {
      type: String,
      enum: ['single', 'multiple', 'unlimited', 'subscription'],
      default: 'single'
    },
    terms: String,
    validity: Number // in days
  },
  tags: [{
    type: String,
    trim: true
  }],
  isActive: {
    type: Boolean,
    default: true
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  isPublished: {
    type: Boolean,
    default: true
  },
  stock: {
    quantity: {
      type: Number,
      default: -1 // -1 for unlimited
    },
    lowStockThreshold: {
      type: Number,
      default: 10
    }
  },
  ratings: {
    average: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },
    count: {
      type: Number,
      default: 0
    }
  },
  reviews: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5
    },
    title: String,
    comment: {
      type: String,
      required: true
    },
    isApproved: {
      type: Boolean,
      default: false
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  sales: {
    totalSold: {
      type: Number,
      default: 0
    },
    revenue: {
      type: Number,
      default: 0
    }
  },
  views: {
    type: Number,
    default: 0
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for better query performance
productSchema.index({ slug: 1 });
productSchema.index({ category: 1 });
productSchema.index({ isActive: 1 });
productSchema.index({ isPublished: 1 });
productSchema.index({ isFeatured: 1 });
productSchema.index({ tags: 1 });
productSchema.index({ 'price.amount': 1 });

// Virtual for discounted price
productSchema.virtual('discountedPrice').get(function() {
  if (this.price.discount > 0) {
    return this.price.amount - (this.price.amount * this.price.discount / 100);
  }
  return this.price.amount;
});

// Virtual for review count
productSchema.virtual('reviewCount').get(function() {
  return this.reviews ? this.reviews.length : 0;
});

// Virtual for approved review count
productSchema.virtual('approvedReviewCount').get(function() {
  return this.reviews ? this.reviews.filter(review => review.isApproved).length : 0;
});

// Virtual for stock status
productSchema.virtual('stockStatus').get(function() {
  if (this.stock.quantity === -1) return 'unlimited';
  if (this.stock.quantity === 0) return 'out-of-stock';
  if (this.stock.quantity <= this.stock.lowStockThreshold) return 'low-stock';
  return 'in-stock';
});

// Pre-save middleware to generate slug
productSchema.pre('save', function(next) {
  if (!this.slug) {
    this.slug = this.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }
  next();
});

module.exports = mongoose.model('Product', productSchema); 