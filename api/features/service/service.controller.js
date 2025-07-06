const Service = require('./service.model');
const { validationRules, validate, sanitizeInput } = require('../../utils/validateInput');

// @desc    Get all services
// @route   GET /api/services
// @access  Public
const getAllServices = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      category,
      featured,
      active,
      search,
      sort = 'order'
    } = req.query;

    // Build query
    const query = {};

    if (category) {
      query.category = category;
    }

    if (featured !== undefined) {
      query.isFeatured = featured === 'true';
    }

    if (active !== undefined) {
      query.isActive = active === 'true';
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { shortDescription: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    // Execute query with pagination
    const services = await Service.find(query)
      .populate('createdBy', 'name email')
      .sort(sort)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    // Get total count
    const total = await Service.countDocuments(query);

    res.status(200).json({
      success: true,
      data: {
        services,
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
      message: 'Error fetching services',
      error: error.message
    });
  }
};

// @desc    Get single service by slug
// @route   GET /api/services/:slug
// @access  Public
const getServiceBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    const service = await Service.findOne({ slug, isActive: true })
      .populate('createdBy', 'name email')
      .populate('updatedBy', 'name email')
      .populate('relatedServices', 'title slug shortDescription icon');

    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'Service not found'
      });
    }

    // Increment views
    service.views += 1;
    await service.save();

    res.status(200).json({
      success: true,
      data: service
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching service',
      error: error.message
    });
  }
};

// @desc    Create new service
// @route   POST /api/services
// @access  Private (Admin only)
const createService = async (req, res) => {
  try {
    const serviceData = {
      ...req.body,
      createdBy: req.user.id
    };

    const service = await Service.create(serviceData);

    res.status(201).json({
      success: true,
      message: 'Service created successfully',
      data: service
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Service with this slug already exists'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Error creating service',
      error: error.message
    });
  }
};

// @desc    Update service
// @route   PUT /api/services/:id
// @access  Private (Admin only)
const updateService = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = {
      ...req.body,
      updatedBy: req.user.id
    };

    const service = await Service.findByIdAndUpdate(
      id,
      updateData,
      {
        new: true,
        runValidators: true
      }
    ).populate('createdBy', 'name email')
     .populate('updatedBy', 'name email')
     .populate('relatedServices', 'title slug shortDescription icon');

    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'Service not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Service updated successfully',
      data: service
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Service with this slug already exists'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Error updating service',
      error: error.message
    });
  }
};

// @desc    Delete service
// @route   DELETE /api/services/:id
// @access  Private (Admin only)
const deleteService = async (req, res) => {
  try {
    const { id } = req.params;

    const service = await Service.findByIdAndDelete(id);

    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'Service not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Service deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting service',
      error: error.message
    });
  }
};

// @desc    Get featured services
// @route   GET /api/services/featured
// @access  Public
const getFeaturedServices = async (req, res) => {
  try {
    const { limit = 6 } = req.query;

    const services = await Service.find({ 
      isFeatured: true, 
      isActive: true 
    })
      .populate('createdBy', 'name email')
      .sort('order')
      .limit(parseInt(limit));

    res.status(200).json({
      success: true,
      data: services
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching featured services',
      error: error.message
    });
  }
};

// @desc    Get services by category
// @route   GET /api/services/category/:category
// @access  Public
const getServicesByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const { page = 1, limit = 10 } = req.query;

    const services = await Service.find({ 
      category, 
      isActive: true 
    })
      .populate('createdBy', 'name email')
      .sort('order')
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const total = await Service.countDocuments({ 
      category, 
      isActive: true 
    });

    res.status(200).json({
      success: true,
      data: {
        services,
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
      message: 'Error fetching services by category',
      error: error.message
    });
  }
};

// @desc    Get service statistics
// @route   GET /api/services/stats
// @access  Private (Admin only)
const getServiceStats = async (req, res) => {
  try {
    const stats = await Service.aggregate([
      {
        $group: {
          _id: null,
          totalServices: { $sum: 1 },
          activeServices: {
            $sum: { $cond: ['$isActive', 1, 0] }
          },
          featuredServices: {
            $sum: { $cond: ['$isFeatured', 1, 0] }
          },
          totalViews: { $sum: '$views' },
          totalInquiries: { $sum: '$inquiries' }
        }
      }
    ]);

    const categoryStats = await Service.aggregate([
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 },
          totalViews: { $sum: '$views' },
          totalInquiries: { $sum: '$inquiries' }
        }
      },
      { $sort: { count: -1 } }
    ]);

    res.status(200).json({
      success: true,
      data: {
        overview: stats[0] || {
          totalServices: 0,
          activeServices: 0,
          featuredServices: 0,
          totalViews: 0,
          totalInquiries: 0
        },
        byCategory: categoryStats
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching service statistics',
      error: error.message
    });
  }
};

// @desc    Toggle service active status
// @route   PATCH /api/services/:id/toggle-active
// @access  Private (Admin only)
const toggleActive = async (req, res) => {
  try {
    const { id } = req.params;

    const service = await Service.findById(id);
    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'Service not found'
      });
    }

    service.isActive = !service.isActive;
    service.updatedBy = req.user.id;
    await service.save();

    res.status(200).json({
      success: true,
      message: `Service ${service.isActive ? 'activated' : 'deactivated'} successfully`,
      data: service
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error toggling active status',
      error: error.message
    });
  }
};

// @desc    Toggle service featured status
// @route   PATCH /api/services/:id/toggle-featured
// @access  Private (Admin only)
const toggleFeatured = async (req, res) => {
  try {
    const { id } = req.params;

    const service = await Service.findById(id);
    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'Service not found'
      });
    }

    service.isFeatured = !service.isFeatured;
    service.updatedBy = req.user.id;
    await service.save();

    res.status(200).json({
      success: true,
      message: `Service ${service.isFeatured ? 'featured' : 'unfeatured'} successfully`,
      data: service
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error toggling featured status',
      error: error.message
    });
  }
};

// @desc    Update service order
// @route   PATCH /api/services/:id/order
// @access  Private (Admin only)
const updateServiceOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const { order } = req.body;

    const service = await Service.findByIdAndUpdate(
      id,
      { order, updatedBy: req.user.id },
      { new: true }
    );

    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'Service not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Service order updated successfully',
      data: service
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating service order',
      error: error.message
    });
  }
};

module.exports = {
  getAllServices,
  getServiceBySlug,
  createService,
  updateService,
  deleteService,
  getFeaturedServices,
  getServicesByCategory,
  getServiceStats,
  toggleActive,
  toggleFeatured,
  updateServiceOrder
}; 