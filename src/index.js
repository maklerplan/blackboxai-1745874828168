require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const leadRoutes = require('./routes/leadRoutes');
const authRoutes = require('./routes/authRoutes');
const maklerRoutes = require('./routes/maklerRoutes');
const notesRoutes = require('./routes/notesRoutes');
const whatsappRoutes = require('./routes/whatsappRoutes');
const sipRoutes = require('./routes/sipRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from client directory
app.use(express.static('client'));

// Routes
app.use('/api/leads', leadRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/makler', maklerRoutes);
app.use('/api/notes', notesRoutes);
app.use('/api/whatsapp', whatsappRoutes);
app.use('/api/sip', sipRoutes);

// Error handling middleware
app.use(errorHandler);

// Connect to MongoDB and start server
mongoose.connect(process.env.DB_CONNECTION_STRING || 'mongodb://localhost:27017/leadmanagement', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}).catch((err) => {
  console.error('Failed to connect to MongoDB', err);
});

// Handle process termination
process.on('SIGTERM', () => {
  console.log('Received SIGTERM. Performing cleanup...');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('Received SIGINT. Performing cleanup...');
  process.exit(0);
});
