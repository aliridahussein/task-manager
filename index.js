const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const taskRoutes = require('./routes/tasks');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());


// Routes
app.use(express.static('public'));
app.use('/api/tasks', taskRoutes);

// Root Route
app.get('/', (req, res) => {
  res.send('Task Manager API is running 🧠');
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
