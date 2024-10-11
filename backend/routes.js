const express = require('express');
const Note = require('./Models/Notes');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const notes = await Note.find();
        res.json(notes);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create a new note
router.post('/', async (req, res) => {
    const note = new Note({
        title: req.body.title,
        content: req.body.content
    });

    try {
        const savedNote = await note.save();
        res.status(201).json(savedNote);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Export the router
module.exports = router;
