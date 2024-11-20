const Teacher = require('../models/teacherModel');
const cloudinary = require('../utils/cloudinary');

// Create new teacher
exports.createTeacher = async (req, res, next) => {
    try {
        const { name, email, subject } = req.body;

        // Check if all required fields are provided
        if (!name || !email || !subject) {
            return res.status(400).json({ error: 'Name, email, and subject are required' });
        }

        const teacher = new Teacher({ name, email, subject });

        // Handle profile image upload if present
        if (req.file) {
            const image = await cloudinary.uploader.upload(req.file.path);
            teacher.profileImageUrl = image.secure_url;
        }

        await teacher.save();
        res.status(201).json(teacher);
    } catch (error) {
        if (error.code === 11000) { // Duplicate email error
            return res.status(400).json({ error: 'Email already in use' });
        }
        next(error);
    }
};

// Get all teachers with pagination
exports.getAllTeachers = async (req, res, next) => {
    try {
        const { page = 1, limit = 10 } = req.query;

        const teachers = await Teacher.find()
            .skip((page - 1) * limit)
            .limit(limit);

        res.status(200).json(teachers);
    } catch (error) {
        next(error);
    }
};

// Get teacher by ID
exports.getTeacherById = async (req, res, next) => {
    try {
        const teacher = await Teacher.findById(req.params.id);
        if (!teacher) {
            return res.status(404).json({ error: 'Teacher not found' });
        }
        res.status(200).json(teacher);
    } catch (error) {
        next(error);
    }
};

// Update teacher
exports.updateTeacher = async (req, res, next) => {
    try {
        const { name, email, subject } = req.body;

        const teacher = await Teacher.findById(req.params.id);
        if (!teacher) {
            return res.status(404).json({ error: 'Teacher not found' });
        }

        teacher.name = name || teacher.name;
        teacher.email = email || teacher.email;
        teacher.subject = subject || teacher.subject;

        if (req.file) {
            const image = await cloudinary.uploader.upload(req.file.path);
            teacher.profileImageUrl = image.secure_url;
        }

        await teacher.save();
        res.status(200).json(teacher);
    } catch (error) {
        next(error);
    }
};

// Delete teacher
exports.deleteTeacher = async (req, res, next) => {
    try {
        const teacher = await Teacher.findById(req.params.id);
        if (!teacher) {
            return res.status(404).json({ error: 'Teacher not found' });
        }
        teacher.deletedAt = Date.now(); 
        await teacher.save();
        res.status(200).json({ message: 'Teacher deleted successfully' });
    } catch (error) {
        next(error);
    }
};
