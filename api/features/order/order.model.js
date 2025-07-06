const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  orderNumber: {
    type: String,
    required: true,
    unique: true
  },
  customer: {
    name: {
      type: String,
      required: [true, 'Customer name is required'],
      trim: true
    },
    email: {
      type: String,
      required: [true, 'Customer email is required'],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please add a valid email'
      ]
    },
    phone: {
      type: String,
      required: [true, 'Customer phone is required']
    },
    company: String,
    website: String
  },
  service: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Service',
    required: [true, 'Service is required']
  },
  serviceDetails: {
    title: String,
    slug: String,
    category: String
  },
  package: {
    type: String,
    enum: ['basic', 'professional', 'enterprise', 'custom'],
    required: [true, 'Package type is required']
  },
  requirements: {
    description: {
      type: String,
      required: [true, 'Project requirements are required']
    },
    features: [String],
    technologies: [String],
    timeline: String,
    budget: {
      type: String,
      enum: ['small', 'medium', 'large', 'enterprise']
    }
  },
  pricing: {
    basePrice: {
      type: Number,
      required: true
    },
    additionalFeatures: [{
      name: String,
      price: Number,
      description: String
    }],
    discount: {
      type: Number,
      default: 0,
      min: 0,
      max: 100
    },
    totalPrice: {
      type: Number,
      required: true
    },
    currency: {
      type: String,
      default: 'USD'
    }
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'in-progress', 'review', 'completed', 'cancelled'],
    default: 'pending'
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium'
  },
  timeline: {
    estimatedStart: Date,
    estimatedEnd: Date,
    actualStart: Date,
    actualEnd: Date
  },
  communication: {
    preferredMethod: {
      type: String,
      enum: ['email', 'phone', 'whatsapp', 'skype', 'zoom'],
      default: 'email'
    },
    timezone: String,
    notes: String
  },
  files: [{
    name: String,
    url: String,
    size: Number,
    uploadedAt: {
      type: Date,
      default: Date.now
    }
  }],
  messages: [{
    sender: {
      type: String,
      enum: ['customer', 'admin'],
      required: true
    },
    message: {
      type: String,
      required: true
    },
    timestamp: {
      type: Date,
      default: Date.now
    },
    read: {
      type: Boolean,
      default: false
    }
  }],
  payment: {
    method: {
      type: String,
      enum: ['paypal', 'stripe', 'bank-transfer', 'crypto', 'other'],
      required: true
    },
    status: {
      type: String,
      enum: ['pending', 'partial', 'completed', 'failed', 'refunded'],
      default: 'pending'
    },
    transactions: [{
      amount: Number,
      currency: String,
      transactionId: String,
      status: String,
      date: {
        type: Date,
        default: Date.now
      }
    }]
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  source: {
    type: String,
    enum: ['website', 'admin', 'referral', 'social-media', 'other'],
    default: 'website'
  },
  tags: [String],
  notes: String
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for better query performance
orderSchema.index({ orderNumber: 1 });
orderSchema.index({ 'customer.email': 1 });
orderSchema.index({ status: 1 });
orderSchema.index({ priority: 1 });
orderSchema.index({ assignedTo: 1 });
orderSchema.index({ createdAt: -1 });

// Virtual for order age
orderSchema.virtual('age').get(function() {
  return Math.floor((Date.now() - this.createdAt) / (1000 * 60 * 60 * 24));
});

// Virtual for total paid amount
orderSchema.virtual('totalPaid').get(function() {
  if (!this.payment.transactions) return 0;
  return this.payment.transactions
    .filter(t => t.status === 'completed')
    .reduce((sum, t) => sum + t.amount, 0);
});

// Virtual for remaining amount
orderSchema.virtual('remainingAmount').get(function() {
  return this.pricing.totalPrice - this.totalPaid;
});

// Pre-save middleware to generate order number
orderSchema.pre('save', async function(next) {
  if (this.isNew) {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    
    // Get count of orders for this month
    const count = await mongoose.model('Order').countDocuments({
      createdAt: {
        $gte: new Date(year, date.getMonth(), 1),
        $lt: new Date(year, date.getMonth() + 1, 1)
      }
    });
    
    this.orderNumber = `ORD-${year}${month}-${String(count + 1).padStart(4, '0')}`;
  }
  next();
});

module.exports = mongoose.model('Order', orderSchema); 