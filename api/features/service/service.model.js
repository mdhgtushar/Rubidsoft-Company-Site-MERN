const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Service title is required'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  slug: {
    type: String,
    required: [true, 'Service slug is required'],
    unique: true,
    lowercase: true,
    trim: true
  },
  shortDescription: {
    type: String,
    required: [true, 'Short description is required'],
    maxlength: [200, 'Short description cannot be more than 200 characters']
  },
  description: {
    type: String,
    required: [true, 'Service description is required']
  },
  category: {
    type: String,
    required: [true, 'Service category is required'],
    enum: ['web-development', 'mobile-development', 'saas-development', 'api-development', 'ui-ux-design', 'consulting', 'maintenance', 'other']
  },
  icon: {
    type: String,
    required: [true, 'Service icon is required']
  },
  image: {
    type: String,
    required: [true, 'Service image is required']
  },
  features: [{
    title: String,
    description: String,
    icon: String
  }],
  benefits: [{
    title: String,
    description: String,
    icon: String
  }],
  pricing: {
    basic: {
      name: String,
      price: Number,
      currency: {
        type: String,
        default: 'USD'
      },
      features: [String],
      description: String
    },
    professional: {
      name: String,
      price: Number,
      currency: {
        type: String,
        default: 'USD'
      },
      features: [String],
      description: String,
      popular: {
        type: Boolean,
        default: false
      }
    },
    enterprise: {
      name: String,
      price: Number,
      currency: {
        type: String,
        default: 'USD'
      },
      features: [String],
      description: String
    }
  },
  process: [{
    step: Number,
    title: String,
    description: String,
    icon: String
  }],
  technologies: [{
    name: String,
    icon: String,
    description: String
  }],
  faqs: [{
    question: String,
    answer: String
  }],
  testimonials: [{
    quote: String,
    author: String,
    position: String,
    company: String,
    rating: {
      type: Number,
      min: 1,
      max: 5
    }
  }],
  relatedServices: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Service'
  }],
  isActive: {
    type: Boolean,
    default: true
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  order: {
    type: Number,
    default: 0
  },
  views: {
    type: Number,
    default: 0
  },
  inquiries: {
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
serviceSchema.index({ slug: 1 });
serviceSchema.index({ category: 1 });
serviceSchema.index({ isActive: 1 });
serviceSchema.index({ isFeatured: 1 });
serviceSchema.index({ order: 1 });

// Virtual for average rating
serviceSchema.virtual('averageRating').get(function() {
  if (!this.testimonials || this.testimonials.length === 0) {
    return 0;
  }
  const totalRating = this.testimonials.reduce((sum, testimonial) => sum + testimonial.rating, 0);
  return (totalRating / this.testimonials.length).toFixed(1);
});

// Virtual for testimonial count
serviceSchema.virtual('testimonialCount').get(function() {
  return this.testimonials ? this.testimonials.length : 0;
});

// Pre-save middleware to generate slug if not provided
serviceSchema.pre('save', function(next) {
  if (!this.slug) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }
  next();
});

module.exports = mongoose.model('Service', serviceSchema); 