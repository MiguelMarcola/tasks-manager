const { addTasks, getTasks } = require('../services/firestoreService');
const getComputerName = require('../utils/getComputerName');

const insertTasks = async (req, res) => {
    try {
      const tasks = req.body.map(task => ({
        description: task.description,
        responsable: task.responsable,
        status: task.status
      }));
      await addTasks(tasks);
      res.status(200).send('Tasks inserted successfully.');
    } catch (error) {
      console.error('Error inserting tasks.:', error);
      res.status(400).send('Error inserting tasks.');
    }
  };

const getAllTasks = async (req, res) => {
  const { name } = req.query;
  const tasks = await getTasks({name});
  res.status(200).json(tasks);
};

module.exports = { insertTasks, getAllTasks };
