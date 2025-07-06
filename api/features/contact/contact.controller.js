const Contact = require('./contact.model');
const Service = require('../service/service.model');
const { validationRules, validate, sanitizeInput } = require('../../utils/validateInput');

// @desc    Get all contacts/inquiries
// @route   GET /api/contact
// @access  Private (Admin only)
const getAllContacts = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      status,
      priority,
      assignedTo,
      source,
      search,
      sort = '-createdAt'
    } = req.query;

    // Build query
    const query = {};

    if (status) {
      query.status = status;
    }

    if (priority) {
      query.priority = priority;
    }

    if (assignedTo) {
      query.assignedTo = assignedTo;
    }

    if (source) {
      query.source = source;
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { subject: { $regex: search, $options: 'i' } },
        { message: { $regex: search, $options: 'i' } },
        { company: { $regex: search, $options: 'i' } }
      ];
    }

    // Execute query with pagination
    const contacts = await Contact.find(query)
      .populate('service', 'title slug category')
      .populate('assignedTo', 'name email')
      .populate('createdBy', 'name email')
      .populate('updatedBy', 'name email')
      .sort(sort)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    // Get total count
    const total = await Contact.countDocuments(query);

    res.status(200).json({
      success: true,
      data: {
        contacts,
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
      message: 'Error fetching contacts',
      error: error.message
    });
  }
};

// @desc    Get single contact
// @route   GET /api/contact/:id
// @access  Private (Admin only)
const getContactById = async (req, res) => {
  try {
    const { id } = req.params;

    const contact = await Contact.findById(id)
      .populate('service', 'title slug category description')
      .populate('assignedTo', 'name email')
      .populate('createdBy', 'name email')
      .populate('updatedBy', 'name email')
      .populate('notes.createdBy', 'name email')
      .populate('responses.sentBy', 'name email');

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      });
    }

    res.status(200).json({
      success: true,
      data: contact
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching contact',
      error: error.message
    });
  }
};

// @desc    Create new contact/inquiry
// @route   POST /api/contact
// @access  Public
const createContact = async (req, res) => {
  try {
    const contactData = {
      ...req.body,
      createdBy: req.user?.id || null,
      ipAddress: req.ip,
      userAgent: req.get('User-Agent')
    };

    // If service ID is provided, get service details
    if (contactData.service) {
      const service = await Service.findById(contactData.service);
      if (service) {
        contactData.serviceDetails = {
          title: service.title,
          slug: service.slug,
          category: service.category
        };
      }
    }

    const contact = await Contact.create(contactData);

    // Populate service details
    await contact.populate('service', 'title slug category');

    res.status(201).json({
      success: true,
      message: 'Contact form submitted successfully',
      data: contact
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error submitting contact form',
      error: error.message
    });
  }
};

// @desc    Update contact
// @route   PUT /api/contact/:id
// @access  Private (Admin only)
const updateContact = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = {
      ...req.body,
      updatedBy: req.user.id
    };

    const contact = await Contact.findByIdAndUpdate(
      id,
      updateData,
      {
        new: true,
        runValidators: true
      }
    )
      .populate('service', 'title slug category')
      .populate('assignedTo', 'name email')
      .populate('createdBy', 'name email')
      .populate('updatedBy', 'name email');

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Contact updated successfully',
      data: contact
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating contact',
      error: error.message
    });
  }
};

// @desc    Delete contact
// @route   DELETE /api/contact/:id
// @access  Private (Admin only)
const deleteContact = async (req, res) => {
  try {
    const { id } = req.params;

    const contact = await Contact.findByIdAndDelete(id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Contact deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting contact',
      error: error.message
    });
  }
};

// @desc    Update contact status
// @route   PATCH /api/contact/:id/status
// @access  Private (Admin only)
const updateContactStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const contact = await Contact.findByIdAndUpdate(
      id,
      { 
        status,
        updatedBy: req.user.id
      },
      { new: true }
    )
      .populate('service', 'title slug category')
      .populate('assignedTo', 'name email');

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Contact status updated successfully',
      data: contact
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating contact status',
      error: error.message
    });
  }
};

// @desc    Assign contact to user
// @route   PATCH /api/contact/:id/assign
// @access  Private (Admin only)
const assignContact = async (req, res) => {
  try {
    const { id } = req.params;
    const { assignedTo } = req.body;

    const contact = await Contact.findByIdAndUpdate(
      id,
      { 
        assignedTo,
        updatedBy: req.user.id
      },
      { new: true }
    )
      .populate('service', 'title slug category')
      .populate('assignedTo', 'name email');

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Contact assigned successfully',
      data: contact
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error assigning contact',
      error: error.message
    });
  }
};

// @desc    Add note to contact
// @route   POST /api/contact/:id/notes
// @access  Private (Admin only)
const addNote = async (req, res) => {
  try {
    const { id } = req.params;
    const { note } = req.body;

    const contact = await Contact.findById(id);
    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      });
    }

    contact.notes.push({
      note,
      createdBy: req.user.id
    });

    contact.updatedBy = req.user.id;
    await contact.save();

    await contact.populate('notes.createdBy', 'name email');

    res.status(200).json({
      success: true,
      message: 'Note added successfully',
      data: contact
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error adding note',
      error: error.message
    });
  }
};

// @desc    Add response to contact
// @route   POST /api/contact/:id/responses
// @access  Private (Admin only)
const addResponse = async (req, res) => {
  try {
    const { id } = req.params;
    const { message, method } = req.body;

    const contact = await Contact.findById(id);
    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      });
    }

    contact.responses.push({
      message,
      method,
      sentBy: req.user.id
    });

    contact.updatedBy = req.user.id;
    await contact.save();

    await contact.populate('responses.sentBy', 'name email');

    res.status(200).json({
      success: true,
      message: 'Response added successfully',
      data: contact
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error adding response',
      error: error.message
    });
  }
};

// @desc    Get contact statistics
// @route   GET /api/contact/stats
// @access  Private (Admin only)
const getContactStats = async (req, res) => {
  try {
    const stats = await Contact.aggregate([
      {
        $group: {
          _id: null,
          totalContacts: { $sum: 1 },
          newContacts: {
            $sum: { $cond: [{ $eq: ['$status', 'new'] }, 1, 0] }
          },
          spamContacts: {
            $sum: { $cond: ['$isSpam', 1, 0] }
          },
          avgSpamScore: { $avg: '$spamScore' }
        }
      }
    ]);

    const statusStats = await Contact.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    const sourceStats = await Contact.aggregate([
      {
        $group: {
          _id: '$source',
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } }
    ]);

    const monthlyStats = await Contact.aggregate([
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' }
          },
          count: { $sum: 1 }
        }
      },
      { $sort: { '_id.year': -1, '_id.month': -1 } },
      { $limit: 12 }
    ]);

    res.status(200).json({
      success: true,
      data: {
        overview: stats[0] || {
          totalContacts: 0,
          newContacts: 0,
          spamContacts: 0,
          avgSpamScore: 0
        },
        byStatus: statusStats,
        bySource: sourceStats,
        monthly: monthlyStats
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching contact statistics',
      error: error.message
    });
  }
};

// @desc    Mark contact as spam/not spam
// @route   PATCH /api/contact/:id/spam
// @access  Private (Admin only)
const toggleSpam = async (req, res) => {
  try {
    const { id } = req.params;
    const { isSpam } = req.body;

    const contact = await Contact.findByIdAndUpdate(
      id,
      { 
        isSpam,
        status: isSpam ? 'spam' : 'new',
        updatedBy: req.user.id
      },
      { new: true }
    );

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      });
    }

    res.status(200).json({
      success: true,
      message: `Contact ${isSpam ? 'marked as spam' : 'marked as not spam'} successfully`,
      data: contact
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating spam status',
      error: error.message
    });
  }
};

module.exports = {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact,
  updateContactStatus,
  assignContact,
  addNote,
  addResponse,
  getContactStats,
  toggleSpam
}; 