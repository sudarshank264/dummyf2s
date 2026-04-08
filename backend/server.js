require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

// Connect Database
connectDB();

const app = express();
// console.log(require('crypto').randomBytes(64).toString('hex'));

// Middleware
app.use(cors()); // Allow frontend to talk to backend
app.use(express.json()); // Allow server to parse JSON payloads

// Mount Routes
app.use('/api/users', require('./routes/userRoute'));
app.use('/api/contact', require('./routes/contactRoute'));
app.use('/api/blogs', require('./routes/blogRoute'));
app.use('/api/reviews', require('./routes/reviewRoute'));

// Health Check Endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'API is running successfully!' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
// Trigger reboot
