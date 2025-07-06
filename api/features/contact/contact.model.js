const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    maxlength: [100, 'Name cannot be more than 100 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email'
    ]
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required']
  },
  company: {
    type: String,
    trim: true,
    maxlength: [100, 'Company name cannot be more than 100 characters']
  },
  website: {
    type: String,
    trim: true
  },
  subject: {
    type: String,
    required: [true, 'Subject is required'],
    trim: true,
    maxlength: [200, 'Subject cannot be more than 200 characters']
  },
  message: {
    type: String,
    required: [true, 'Message is required'],
    trim: true,
    maxlength: [2000, 'Message cannot be more than 2000 characters']
  },
  service: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Service'
  },
  serviceDetails: {
    title: String,
    slug: String,
    category: String
  },
  budget: {
    type: String,
    enum: ['small', 'medium', 'large', 'enterprise', 'not-specified']
  },
  timeline: {
    type: String,
    enum: ['urgent', '1-2-weeks', '1-2-months', '3-6-months', 'flexible', 'not-specified']
  },
  source: {
    type: String,
    enum: ['website', 'google', 'social-media', 'referral', 'email', 'phone', 'other'],
    default: 'website'
  },
  status: {
    type: String,
    enum: ['new', 'read', 'in-progress', 'responded', 'closed', 'spam'],
    default: 'new'
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium'
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  tags: [{
    type: String,
    trim: true
  }],
  notes: [{
    note: {
      type: String,
      required: true
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  responses: [{
    message: {
      type: String,
      required: true
    },
    sentBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    sentAt: {
      type: Date,
      default: Date.now
    },
    method: {
      type: String,
      enum: ['email', 'phone', 'whatsapp', 'other'],
      required: true
    }
  }],
  followUp: {
    scheduled: {
      type: Date
    },
    completed: {
      type: Date
    },
    notes: String
  },
  ipAddress: String,
  userAgent: String,
  location: {
    country: String,
    city: String,
    timezone: String
  },
  isSpam: {
    type: Boolean,
    default: false
  },
  spamScore: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
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
contactSchema.index({ email: 1 });
contactSchema.index({ status: 1 });
contactSchema.index({ priority: 1 });
contactSchema.index({ assignedTo: 1 });
contactSchema.index({ createdAt: -1 });
contactSchema.index({ source: 1 });

// Virtual for age in days
contactSchema.virtual('age').get(function() {
  return Math.floor((Date.now() - this.createdAt) / (1000 * 60 * 60 * 24));
});

// Virtual for response count
contactSchema.virtual('responseCount').get(function() {
  return this.responses ? this.responses.length : 0;
});

// Virtual for note count
contactSchema.virtual('noteCount').get(function() {
  return this.notes ? this.notes.length : 0;
});

// Pre-save middleware to set spam score
contactSchema.pre('save', function(next) {
  // Simple spam detection logic
  let spamScore = 0;
  
  // Check for suspicious patterns
  if (this.message && this.message.length < 10) spamScore += 20;
  if (this.subject && this.subject.toLowerCase().includes('viagra')) spamScore += 50;
  if (this.message && this.message.toLowerCase().includes('viagra')) spamScore += 50;
  if (this.email && this.email.includes('@test.com')) spamScore += 30;
  
  this.spamScore = spamScore;
  this.isSpam = spamScore > 70;
  
  next();
});

module.exports = mongoose.model('Contact', contactSchema); 