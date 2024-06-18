const db = require('../config/firestoreConfig');
const { getComputerName } = require('../utils/getComputerName');

const addTasks = async (tasks) => {
  const tasksRef = db.collection('tasks');
  const computer = getComputerName();

  const promises = tasks.map(async (task) => {
    task.computer = computer;
    const newTaskRef = tasksRef.doc();
    await newTaskRef.set(task);
  });

  try {
    await Promise.all(promises);
  } catch (error) {
    console.error('Error inserting tasks.', error);
    throw error;
  }
};

const getTasks = async ({name}) => {
  const tasksCollection = db.collection('tasks')
  if(!name) {
    const tasksSnapshot = await tasksCollection.get();
    return tasksSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }

  const tasksSnapshot = await tasksCollection.where('responsable', '==', name).get();
  return tasksSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

module.exports = {
  addTasks,
  getTasks
};
