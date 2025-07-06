const express = require('express');
const router = express.Router();
const {
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
} = require('./contact.controller');
const { protect, authorize } = require('../../middleware/auth.middleware');
const { validationRules, validate } = require('../../utils/validateInput');

// Public routes
router.post('/', createContact);

// Protected routes (Admin only)
router.use(protect);
router.use(authorize('admin'));

router.get('/', getAllContacts);
router.get('/:id', getContactById);
router.put('/:id', updateContact);
router.delete('/:id', deleteContact);
router.patch('/:id/status', updateContactStatus);
router.patch('/:id/assign', assignContact);
router.post('/:id/notes', addNote);
router.post('/:id/responses', addResponse);
router.patch('/:id/spam', toggleSpam);
router.get('/stats/overview', getContactStats);

module.exports = router; 