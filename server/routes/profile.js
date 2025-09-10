const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Middleware to authenticate user
const authenticate = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).send('Access denied.');
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).send('Invalid token.');
        req.user = user;
        next();
    });
};

// Update user profile
router.put('/update', authenticate, async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).send('User not found.');

        if (name) user.name = name;
        if (email) user.email = email;
        if (password) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);
        }

        await user.save();
        res.status(200).send('Profile updated successfully.');
    } catch (error) {
        res.status(500).send('Server error.');
    }
});

// Get user profile
router.get('/', authenticate, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user) return res.status(404).send('User not found.');
        res.status(200).json(user);
    } catch (error) {
        res.status(500).send('Server error.');
    }
});

// Delete user profile
router.delete('/delete', authenticate, async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.user.id);
        if (!user) return res.status(404).send('User not found.');
        res.status(200).send('Profile deleted successfully.');
    } catch (error) {
        res.status(500).send('Server error.');
    }
});

module.exports = router;