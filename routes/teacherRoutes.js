const express = require('express');
const router = express.Router();
const teacherController = require('../controllers/teacherController');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });  
const protect = require('../utils/authMiddleware');  // Authorization middleware

// Route to create a new teacher
router.post('/', protect, upload.single('profileImage'), teacherController.createTeacher);

// Route to get all teachers
router.get('/', protect, teacherController.getAllTeachers);

// Route to get a teacher by ID
router.get('/:id', protect, teacherController.getTeacherById);

// Route to update teacher
router.put('/:id', protect, upload.single('profileImage'), teacherController.updateTeacher);

// Route to delete teacher
router.delete('/:id', protect, teacherController.deleteTeacher);

module.exports = router;
