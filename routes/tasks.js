const express = require('express');
const router = express.Router();
const pool = require('../db');

// Create a new task
router.post('/', async (req, res) => {
  const { title, completed } = req.body;
  try {
    const newTask = await pool.query(
      'INSERT INTO tasks (title, completed) VALUES ($1, $2) RETURNING *',
      [title, completed]
    );
    res.json(newTask.rows[0]);
  } catch (err) {
    console.error('❌ Error in /api/tasks route:', err);
    res.status(500).send('Server error');
  }
});

// Get all tasks
router.get('/', async (req, res) => {
  try {
    const allTasks = await pool.query('SELECT * FROM tasks ORDER BY id');
    res.json(allTasks.rows);
  } catch (err) {
    console.error('❌ Error in /api/tasks route:', err);
    res.status(500).send('Server error');
  }
});

// Update a task
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { title, completed } = req.body;
  try {
    const updatedTask = await pool.query(
      'UPDATE tasks SET title = $1, completed = $2 WHERE id = $3 RETURNING *',
      [title, completed, id]
    );
    res.json(updatedTask.rows[0]);
  } catch (err) {
    console.error('❌ Error in /api/tasks route:', err);
    res.status(500).send('Server error');
  }
});

// Delete a task
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM tasks WHERE id = $1', [id]);
    res.json({ message: 'Task deleted' });
  } catch (err) {
    console.error('❌ Error in /api/tasks route:', err);
    res.status(500).send('Server error');
  }
});

// Get a single task by ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const result = await pool.query('SELECT * FROM tasks WHERE id = $1', [id]);
      if (result.rows.length === 0) {
        return res.status(404).send('Task not found');
      }
      res.json(result.rows[0]);
    } catch (err) {
      console.error('❌ Error in /api/tasks route:', err);
      res.status(500).send('Server error');
    }
  });
  

module.exports = router;
