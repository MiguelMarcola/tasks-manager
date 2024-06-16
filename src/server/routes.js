const express = require('express');
const { insertTasks, getAllTasks } = require('../controllers/taskController');

const router = express.Router();

const validateTasksArray = (req, res, next) => {
    const tasks = req.body;
  
    if (!Array.isArray(tasks)) {
      return res.status(400).json({ error: 'Request body must be an array.' });
    }
  
    const errors = [];
  
    tasks.forEach((task, index) => {
      if (!task.description) {
        errors.push(`Description is required for task at position ${index}.`);
      }
  
      if (!task.responsable) {
        errors.push(`Responsable is required for task at position ${index}.`);
      }
  
      if (!task.status) {
        errors.push(`Status is required for task at position ${index}.`);
      } else if (!['todo', 'doing', 'done'].includes(task.status)) {
        errors.push(`Status for task at position ${index} must be 'todo', 'doing', or 'done'.`);
      }
    });
  
    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }
  
    next();
};

router.post('/insert-tasks', validateTasksArray, insertTasks);
router.get('/get-tasks', getAllTasks);

module.exports = router;
