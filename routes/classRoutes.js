const express = require('express');
const router = express.Router();
const classController = require('../controllers/classController');
const protect = require('../utils/authMiddleware');  // Authorization middleware

// Route to create a new class
router.post('/', protect, classController.createClass);

// Route to get all classes
router.get('/', protect, classController.getAllClasses);

// Route to get a class by ID
router.get('/:id', protect, classController.getClassById);

// Route to update class
router.put('/:id', protect, classController.updateClass);

// Route to delete class
router.delete('/:id', protect, classController.deleteClass);

module.exports = router;
