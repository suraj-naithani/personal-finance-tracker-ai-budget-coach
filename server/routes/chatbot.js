const express = require('express');
const router = express.Router();
const axios = require('axios');
const jwt = require('jsonwebtoken');

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

router.post('/chat', async (req, res) => {
    const { message } = req.body;
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // User is authenticated, proceed with OpenAI API call
        const response = await axios.post('https://api.openai.com/v1/chat/completions', {
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: message }],
        }, {
            headers: {
                'Authorization': `Bearer ${OPENAI_API_KEY}`,
                'Content-Type': 'application/json',
            },
        });

        const botReply = response.data.choices[0].message.content;
        return res.status(200).json({ reply: botReply });
    } catch (error) {
        console.error('Error communicating with OpenAI API:', error);
        if (error.response) {
            return res.status(error.response.status).json({ error: error.response.data });
        }
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;