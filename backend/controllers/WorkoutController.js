const Workout = require('../models/Workout');

// Add a new workout log
const addWorkoutLog = async (req, res) => {
    const { date, exercise, reps, weight, category } = req.body;

    // Validate input data
    if (!date || !exercise || !reps || !category) {
        return res.status(400).json({ error: 'All fields are required: date, exercise, reps, and category.' });
    }

    const workoutData = {
        date,
        exercise,
        reps,
        weight: weight || 0, // Default to 0 if weight is not provided
        category,
    };

    try {
        const newWorkoutLog = new Workout(workoutData);
        await newWorkoutLog.save();
        res.status(201).json({ message: 'Workout log added successfully' });
    } catch (error) {
        console.error('Error saving workout log to the database:', error);
        res.status(500).json({ error: `Error saving workout log to the database: ${error.message}` });
    }
};

// Fetch workout logs by date
const getWorkoutLogsByDate = async (req, res) => {
    const { date } = req.params;

    try {
        const workoutLogs = await Workout.find({ date });
        res.status(200).json(workoutLogs);
    } catch (error) {
        console.error('Error fetching workout logs:', error);
        res.status(500).json({ message: 'Failed to fetch workout logs.' });
    }
};

// Mark a workout as completed
const completeWorkoutLog = async (req, res) => {
    const { id } = req.params;

    try {
        const workout = await Workout.findByIdAndUpdate(
            id,
            { status: 'completed' },
            { new: true }
        );

        if (!workout) {
            return res.status(404).json({ message: 'Workout not found.' });
        }

        res.status(200).json({ message: 'Workout marked as completed.', workout });
    } catch (error) {
        console.error('Error completing workout log:', error);
        res.status(500).json({ message: 'Failed to mark workout as completed.' });
    }
};

// Get the count of completed workouts for a specific date
const getCompletedWorkoutCountByDate = async (req, res) => {
    const { date } = req.params;

    try {
        const count = await Workout.countDocuments({ date, status: 'completed' });
        res.status(200).json({ count });
    } catch (error) {
        console.error('Error fetching completed workout count:', error);
        res.status(500).json({ message: 'Failed to fetch completed workout count.' });
    }
};

module.exports = { 
    addWorkoutLog, 
    getWorkoutLogsByDate, 
    completeWorkoutLog, 
    getCompletedWorkoutCountByDate 
};
