const express = require('express');
const router = express.Router();
const Budget = require('../models/Budget');
const jwt = require('jsonwebtoken');

// Middleware to authenticate user
const authenticateJWT = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) return res.sendStatus(403);
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

// Create a new budget
router.post('/create', authenticateJWT, async (req, res) => {
    const { name, goalAmount, currentAmount } = req.body;
    if (!name || !goalAmount) {
        return res.status(400).json({ message: 'Name and goal amount are required' });
    }
    try {
        const budget = new Budget({
            userId: req.user.id,
            name,
            goalAmount,
            currentAmount: currentAmount || 0,
            createdAt: new Date()
        });
        await budget.save();
        res.status(201).json(budget);
    } catch (error) {
        res.status(500).json({ message: 'Error creating budget', error });
    }
});

// Get all budgets for the authenticated user
router.get('/', authenticateJWT, async (req, res) => {
    try {
        const budgets = await Budget.find({ userId: req.user.id });
        res.status(200).json(budgets);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching budgets', error });
    }
});

// Update current amount of a budget
router.put('/:id', authenticateJWT, async (req, res) => {
    const { currentAmount } = req.body;
    if (currentAmount === undefined) {
        return res.status(400).json({ message: 'Current amount is required' });
    }
    try {
        const budget = await Budget.findOneAndUpdate(
            { _id: req.params.id, userId: req.user.id },
            { currentAmount },
            { new: true }
        );
        if (!budget) {
            return res.status(404).json({ message: 'Budget not found' });
        }
        res.status(200).json(budget);
    } catch (error) {
        res.status(500).json({ message: 'Error updating budget', error });
    }
});

// Delete a budget
router.delete('/:id', authenticateJWT, async (req, res) => {
    try {
        const budget = await Budget.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
        if (!budget) {
            return res.status(404).json({ message: 'Budget not found' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Error deleting budget', error });
    }
});

module.exports = router;