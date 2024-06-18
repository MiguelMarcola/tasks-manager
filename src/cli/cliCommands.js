const { addTasks, getTasks } = require('../services/firestoreService');

const insertTasks = async (tasks) => {
  const taskObjects = tasks.map(task => ({
    description: task.description,
    responsable: task.responsable,
    status: task.status,
  }));
  await addTasks(taskObjects);
};

const showTasks = async ({name}) => {
  const tasks = await getTasks({name});
  tasks.forEach((task, index) => {
    console.log(`${index + 1} - ${task.id} - ${task.description} - ${task.responsable} - ${task.status} - ${task.computer}`);
  });
};

module.exports = { insertTasks, showTasks };
