const Student = require('../models/studentModel');
const cloudinary = require('../utils/cloudinary');
const Class = require('../models/classModel');

// Create new student
exports.createStudent = async (req, res, next) => {
    try {
        const { name, email, classId } = req.body;

        // Check if all required fields are provided
        if (!name || !email || !classId) {
            return res.status(400).json({ error: 'Name, email, and classId are required' });
        }

        const student = new Student({ name, email, classId });

        // Handle profile image upload if present
        if (req.file) {
            const image = await cloudinary.uploader.upload(req.file.path);
            student.profileImageUrl = image.secure_url;
        }

        // Find the class the student belongs to
        const classData = await Class.findById(classId);
        if (!classData) {
            return res.status(404).json({ error: 'Class not found' });
        }

        // Increment the student count for the class
        classData.studentCount += 1;
        await classData.save();

        // Save the new student
        await student.save();

        res.status(201).json(student);
    } catch (error) {
        if (error.code === 11000) { // Duplicate email error
            return res.status(400).json({ error: 'Email already in use' });
        }
        next(error);
    }
};

// Get all students with pagination and filtering by class
exports.getAllStudents = async (req, res, next) => {
    try {
        const { page = 1, limit = 10, classId } = req.query;
        const filter = classId ? { classId } : {};
        
        const students = await Student.find(filter)
            .skip((page - 1) * limit)
            .limit(limit);

        res.status(200).json(students);
    } catch (error) {
        next(error);
    }
};

// Get a single student by ID
exports.getStudentById = async (req, res, next) => {
    try {
        const student = await Student.findById(req.params.id);
        if (!student) {
            return res.status(404).json({ error: 'Student not found' });
        }
        res.status(200).json(student);
    } catch (error) {
        next(error);
    }
};

// Update a student
exports.updateStudent = async (req, res, next) => {
    try {
        const { name, email, classId } = req.body;

        const student = await Student.findById(req.params.id);
        if (!student) {
            return res.status(404).json({ error: 'Student not found' });
        }

        student.name = name || student.name;
        student.email = email || student.email;
        student.classId = classId || student.classId;

        if (req.file) {
            const image = await cloudinary.uploader.upload(req.file.path);
            student.profileImageUrl = image.secure_url;
        }

        await student.save();
        res.status(200).json(student);
    } catch (error) {
        next(error);
    }
};

// Delete a student
exports.deleteStudent = async (req, res, next) => {
    try {
        const student = await Student.findById(req.params.id);
        if (!student) {
            return res.status(404).json({ error: 'Student not found' });
        }
        student.deletedAt = Date.now(); 
        await student.save();
        res.status(200).json({ message: 'Student deleted successfully' });
    } catch (error) {
        next(error);
    }
};
