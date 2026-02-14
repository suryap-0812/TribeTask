import express from 'express';
import { body, validationResult } from 'express-validator';
import Task from '../models/Task.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// All routes are protected
router.use(protect);

// @route   GET /api/tasks
// @desc    Get all tasks for current user
// @access  Private
router.get('/', async (req, res) => {
    try {
        const { status, tribe, priority, starred } = req.query;

        // Build query
        const query = { user: req.user._id };

        if (status) query.status = status;
        if (tribe) query.tribe = tribe;
        if (priority) query.priority = priority;
        if (starred === 'true') query.starred = true;

        const tasks = await Task.find(query)
            .populate('tribe', 'name color')
            .sort({ dueDate: 1, createdAt: -1 });

        res.json(tasks);
    } catch (error) {
        console.error('Get tasks error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// @route   GET /api/tasks/:id
// @desc    Get specific task
// @access  Private
router.get('/:id', async (req, res) => {
    try {
        const task = await Task.findOne({
            _id: req.params.id,
            user: req.user._id,
        }).populate('tribe', 'name color');

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        res.json(task);
    } catch (error) {
        console.error('Get task error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// @route   POST /api/tasks
// @desc    Create new task
// @access  Private
router.post(
    '/',
    [
        body('title').trim().notEmpty().withMessage('Title is required'),
        body('priority').optional().isIn(['low', 'medium', 'high']),
        body('status').optional().isIn(['pending', 'in-progress', 'completed']),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const task = await Task.create({
                ...req.body,
                user: req.user._id,
            });

            await task.populate('tribe', 'name color');

            res.status(201).json(task);
        } catch (error) {
            console.error('Create task error:', error);
            res.status(500).json({ message: 'Server error' });
        }
    }
);

// @route   PUT /api/tasks/:id
// @desc    Update task
// @access  Private
router.put('/:id', async (req, res) => {
    try {
        const task = await Task.findOne({
            _id: req.params.id,
            user: req.user._id,
        });

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        // Update fields
        const allowedUpdates = ['title', 'description', 'priority', 'status', 'dueDate', 'tribe', 'starred', 'tags', 'completed'];
        allowedUpdates.forEach((field) => {
            if (req.body[field] !== undefined) {
                task[field] = req.body[field];
            }
        });

        await task.save();
        await task.populate('tribe', 'name color');

        res.json(task);
    } catch (error) {
        console.error('Update task error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// @route   PATCH /api/tasks/:id/complete
// @desc    Toggle task completion
// @access  Private
router.patch('/:id/complete', async (req, res) => {
    try {
        const task = await Task.findOne({
            _id: req.params.id,
            user: req.user._id,
        });

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        task.completed = !task.completed;
        await task.save();
        await task.populate('tribe', 'name color');

        res.json(task);
    } catch (error) {
        console.error('Toggle complete error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// @route   PATCH /api/tasks/:id/star
// @desc    Toggle task starred status
// @access  Private
router.patch('/:id/star', async (req, res) => {
    try {
        const task = await Task.findOne({
            _id: req.params.id,
            user: req.user._id,
        });

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        task.starred = !task.starred;
        await task.save();
        await task.populate('tribe', 'name color');

        res.json(task);
    } catch (error) {
        console.error('Toggle star error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// @route   DELETE /api/tasks/:id
// @desc    Delete task
// @access  Private
router.delete('/:id', async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({
            _id: req.params.id,
            user: req.user._id,
        });

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        res.json({ message: 'Task deleted successfully' });
    } catch (error) {
        console.error('Delete task error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

export default router;
