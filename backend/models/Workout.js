const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema({
    date: {
        type: String,
        required: true,
    },
    exercise: {
        type: String,
        required: true,
    },
    reps: {
        type: Number,
        required: true,
    },
    weight: {
        type: Number,
        default: 0,
    },
    category: {
        type: String,
        enum: ['Arm', 'Chest', 'Abs'],
        required: true,
    },
    status: {
        type: String,
        enum: ['pending', 'completed'],
        default: 'pending',
    },
}, { timestamps: true });

module.exports = mongoose.model('Workout', workoutSchema);
