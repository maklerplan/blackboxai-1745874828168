const notesRoutes = require('./routes/notesRoutes');
const whatsappRoutes = require('./routes/whatsappRoutes');
const sipRoutes = require('./routes/sipRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = require('./index_part1').app; // Assuming app is exported from part1

// Middleware
app.use('/api/notes', notesRoutes);
app.use('/api/whatsapp', whatsappRoutes);
app.use('/api/sip', sipRoutes);

// Error handling middleware
app.use(errorHandler);

// Export app if needed
module.exports = app;
