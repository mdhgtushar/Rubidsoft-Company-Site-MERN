const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Project title is required'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  slug: {
    type: String,
    required: [true, 'Project slug is required'],
    unique: true,
    lowercase: true,
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Project description is required'],
    maxlength: [500, 'Description cannot be more than 500 characters']
  },
  fullDescription: {
    type: String,
    required: [true, 'Full project description is required']
  },
  category: {
    type: String,
    required: [true, 'Project category is required'],
    enum: ['web-development', 'mobile-app', 'saas', 'ecommerce', 'api-development', 'ui-ux', 'other']
  },
  technologies: [{
    type: String,
    trim: true
  }],
  client: {
    name: {
      type: String,
      required: [true, 'Client name is required']
    },
    industry: String,
    website: String
  },
  projectDetails: {
    duration: String,
    teamSize: Number,
    budget: {
      type: String,
      enum: ['small', 'medium', 'large', 'enterprise']
    },
    status: {
      type: String,
      enum: ['completed', 'in-progress', 'on-hold', 'cancelled'],
      default: 'completed'
    }
  },
  images: {
    thumbnail: {
      type: String,
      required: [true, 'Project thumbnail is required']
    },
    gallery: [String],
    screenshots: [String]
  },
  features: [{
    title: String,
    description: String,
    icon: String
  }],
  challenges: [String],
  solutions: [String],
  results: {
    metrics: [{
      label: String,
      value: String,
      description: String
    }],
    testimonials: [{
      quote: String,
      author: String,
      position: String,
      company: String
    }]
  },
  links: {
    liveUrl: String,
    githubUrl: String,
    caseStudy: String
  },
  tags: [String],
  isFeatured: {
    type: Boolean,
    default: false
  },
  isPublished: {
    type: Boolean,
    default: true
  },
  views: {
    type: Number,
    default: 0
  },
  rating: {
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
projectSchema.index({ slug: 1 });
projectSchema.index({ category: 1 });
projectSchema.index({ isFeatured: 1 });
projectSchema.index({ isPublished: 1 });
projectSchema.index({ tags: 1 });
projectSchema.index({ 'client.name': 1 });

// Virtual for formatted duration
projectSchema.virtual('formattedDuration').get(function() {
  return this.projectDetails.duration;
});

// Virtual for technology count
projectSchema.virtual('technologyCount').get(function() {
  return this.technologies.length;
});

// Pre-save middleware to generate slug if not provided
projectSchema.pre('save', function(next) {
  if (!this.slug) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }
  next();
});

module.exports = mongoose.model('Project', projectSchema); 