const express = require('express');
const router = express.Router();
const Event = require('../models/Event');

// Get all events
router.get('/', async (req, res) => {
    try {
        const events = await Event.find();
        res.render('events/index', { events });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Form to create a new event
router.get('/new', (req, res) => {
    res.render('events/new');
});

// Create a new event
router.post('/', async (req, res) => {
    const event = new Event({
        title: req.body.title,
        date: req.body.date,
        reminder: req.body.reminder || false,
    });
    try {
        const newEvent = await event.save();
        res.redirect('/events');
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Form to edit an event
router.get('/:id/edit', async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        res.render('events/edit', { event });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update an event by ID
router.put('/:id', async (req, res) => {
    const eventId = req.params.id;
    const { title, date, reminder } = req.body;

    try {
        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        event.date = date;
        event.title = title;
        event.reminder = reminder;

        await event.save();
        res.redirect('/events');
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Delete an event
router.delete('/:id', async (req, res) => {
    try {
        await Event.findByIdAndDelete(req.params.id);
        res.redirect('/events');
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
