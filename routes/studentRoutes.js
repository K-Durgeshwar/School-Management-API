const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });  
const protect = require('../utils/authMiddleware');  


// Route to create a new student
router.post('/', protect, upload.single('profileImage'), studentController.createStudent);

// Route to get all students
router.get('/', protect, studentController.getAllStudents);

// Route to get a student by ID
router.get('/:id', protect, studentController.getStudentById);

// Route to update student
router.put('/:id', protect, upload.single('profileImage'), studentController.updateStudent);

// Route to delete student
router.delete('/:id', protect, studentController.deleteStudent);

module.exports = router;
