const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Finance = require('../models/Finance'); // Assuming a Finance model is defined in models/Finance.js

// Middleware to authenticate JWT
const authenticateJWT = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) return res.sendStatus(403);
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

// Create a new income or expense
router.post('/transaction', authenticateJWT, async (req, res) => {
    const { amount, category, type } = req.body;
    if (!amount || !category || !type) {
        return res.status(400).json({ message: 'Amount, category, and type are required.' });
    }

    const transaction = new Finance({
        userId: req.user.id,
        amount,
        category,
        type,
        date: new Date()
    });

    try {
        const savedTransaction = await transaction.save();
        res.status(201).json(savedTransaction);
    } catch (error) {
        res.status(500).json({ message: 'Error saving transaction', error });
    }
});

// Get all transactions for a user
router.get('/transactions', authenticateJWT, async (req, res) => {
    try {
        const transactions = await Finance.find({ userId: req.user.id });
        res.status(200).json(transactions);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching transactions', error });
    }
});

// Update a transaction
router.put('/transaction/:id', authenticateJWT, async (req, res) => {
    const { amount, category, type } = req.body;
    try {
        const updatedTransaction = await Finance.findByIdAndUpdate(
            req.params.id,
            { amount, category, type },
            { new: true }
        );
        if (!updatedTransaction) {
            return res.status(404).json({ message: 'Transaction not found' });
        }
        res.status(200).json(updatedTransaction);
    } catch (error) {
        res.status(500).json({ message: 'Error updating transaction', error });
    }
});

// Delete a transaction
router.delete('/transaction/:id', authenticateJWT, async (req, res) => {
    try {
        const deletedTransaction = await Finance.findByIdAndDelete(req.params.id);
        if (!deletedTransaction) {
            return res.status(404).json({ message: 'Transaction not found' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Error deleting transaction', error });
    }
});

module.exports = router;