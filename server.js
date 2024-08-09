// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const eventRoutes = require('./routes/eventRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
const methodOverride = require('method-override');
app.use(methodOverride('_method'));

mongoose.connect('your-moongoDB-URL')
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch(err => {
        console.error('Error connecting to MongoDB:', err);
    });


// Use event routes
app.use('/events', eventRoutes);

// Home route to redirect to /events
app.get('/', (req, res) => {
    res.redirect('/events');
});


// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
