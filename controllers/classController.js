const Class = require('../models/classModel');

// Create new class
exports.createClass = async (req, res, next) => {
    try {
        const { name, teacherId, studentCount } = req.body;

        // Check if all required fields are provided
        if (!name || !teacherId) {
            return res.status(400).json({ error: 'Class name and teacherId are required' });
        }

        const newClass = new Class({ name, teacherId, studentCount });

        await newClass.save();
        res.status(201).json(newClass);
    } catch (error) {
        next(error);
    }
};

// Get all classes
exports.getAllClasses = async (req, res, next) => {
    try {
        const classes = await Class.find();
        res.status(200).json(classes);
    } catch (error) {
        next(error);
    }
};

// Get class by ID
exports.getClassById = async (req, res, next) => {
    try {
        const classData = await Class.findById(req.params.id);
        if (!classData) {
            return res.status(404).json({ error: 'Class not found' });
        }
        res.status(200).json(classData);
    } catch (error) {
        next(error);
    }
};

// Update class
exports.updateClass = async (req, res, next) => {
    try {
        const { name, teacherId, studentCount } = req.body;

        const classData = await Class.findById(req.params.id);
        if (!classData) {
            return res.status(404).json({ error: 'Class not found' });
        }

        classData.name = name || classData.name;
        classData.teacherId = teacherId || classData.teacherId;
        classData.studentCount = studentCount || classData.studentCount;

        await classData.save();
        res.status(200).json(classData);
    } catch (error) {
        next(error);
    }
};

// Delete class
exports.deleteClass = async (req, res, next) => {
    try {
        const classData = await Class.findById(req.params.id);
        if (!classData) {
            return res.status(404).json({ error: 'Class not found' });
        }
        await classData.remove();
        res.status(200).json({ message: 'Class deleted successfully' });
    } catch (error) {
        next(error);
    }
};
