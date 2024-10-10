const express = require('express');
const router = express.Router(); // Correct usage of Router
const Chat = require('../models/Chat');

// POST route to handle user messages
router.post('/message', async (req, res) => {
    const userMessage = req.body.message;
    if (!userMessage) {
        return res.status(400).json({ message: 'Message cannot be empty' });
    }

    // Predefined responses
    let botResponse = "Sorry, I didn't understand that.";
    const predefinedReplies = {
        "hello": "Hello! How can I assist you today?",
        "bye": "Goodbye! Have a great day!",
        "how are you": "I'm just a bot, but I'm doing great!"
    };

    // Check if the message has a predefined response
    for (const key in predefinedReplies) {
        if (userMessage.toLowerCase().includes(key)) {
            botResponse = predefinedReplies[key];
            break;
        }
    }

    // Save conversation in MongoDB
    const chat = new Chat({
        userMessage,
        botResponse
    });
    await chat.save();

    // Send the bot's response back to the client
    res.json({ message: botResponse });
});

module.exports = router;
