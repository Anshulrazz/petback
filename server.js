const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
// Initialize the Express app
const app = express();

app.use(cors());
// Middleware
app.use(bodyParser.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded
app.use(bodyParser.json()); // For parsing application/json


// Connect to MongoDB
mongoose.connect('mongodb+srv://braj70901:isSdFLOkHXzJJFax@testpro.bz2qg3u.mongodb.net/anu', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Define Quryies schema and model
const QuryiesSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: String,
    subject: String,
    message: String
});
const Quryies = mongoose.model('Quryies', QuryiesSchema);

// Define Booking schema and model
const BookingSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: String,
    date: String,
    time: String,
    service: String
});
const Booking = mongoose.model('Booking', BookingSchema);


// Routes for Bookings
app.post('/bookings', async (req, res) => {
    const newBooking = new Booking(req.body);
    try {
        const savedBooking = await newBooking.save();
        res.status(201).json(savedBooking);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Routes for Quryies

app.post('/quryies', async (req, res) => {
    const newQuery = new Quryies(req.body);
    try {
        const savedQuery = await newQuery.save();
        res.status(201).json(savedQuery);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});
// Get all bookings
app.get('/bookings', async (req, res) => {
    try {
        const bookings = await Booking.find();
        res.status(200).json(bookings);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Get all queries
app.get('/quryies', async (req, res) => {
    try {
        const queries = await Quryies.find();
        res.status(200).json(queries);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

//for accessing local network
const os = require('os');
const networkInterfaces = os.networkInterfaces();
const localIpAddresses = [];

for (const iface in networkInterfaces) {
  networkInterfaces[iface].forEach(details => {
    if (details.family === 'IPv4' && !details.internal) {
      localIpAddresses.push(details.address);
    }
  });
}
const myip = localIpAddresses[0];
console.log('Local IP addresses:', myip);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running at ==> http://${myip}:${PORT}`);
});

