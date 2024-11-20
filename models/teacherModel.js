const mongoose = require('mongoose');
const { Schema } = mongoose;

const teacherSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true, 
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email'], 
    },
    subject: {
        type: String,
        required: [true, 'Subject is required'],
    },
    profileImageUrl: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Teacher', teacherSchema);
