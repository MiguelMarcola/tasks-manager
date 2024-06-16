const { addTasks, getTasks } = require('../services/firestoreService');

jest.mock('../services/firestoreService');
jest.mock('../utils/getComputerName');

const { insertTasks, showTasks } = require('./cliCommands');

describe('CLI Functions', () => {
  describe('insertTasks', () => {
    it('should insert tasks', async () => {
      const tasks = [
        { description: 'Task 1', responsable: 'John', status: 'todo' },
        { description: 'Task 2', responsable: 'Jane', status: 'doing' },
      ];
      const taskObjects = tasks.map(task => ({
        description: task.description,
        responsable: task.responsable,
        status: task.status,
      }));
      await insertTasks(tasks);

      expect(addTasks).toHaveBeenCalledWith(taskObjects);
    });
  });

  describe('showTasks', () => {
    it('should show tasks', async () => {
      const tasks = [
        { id: '1', description: 'Task 1', responsable: 'John', status: 'todo', computer: 'TestComputer' },
        { id: '2', description: 'Task 2', responsable: 'Jane', status: 'doing', computer: 'TestComputer' },
      ];
      const consoleLogMock = jest.spyOn(console, 'log').mockImplementation(() => {});
      getTasks.mockResolvedValue(tasks);

      await showTasks();

      tasks.forEach((task, index) => {
        expect(consoleLogMock).toHaveBeenCalledWith(`${index + 1} - ${task.id} - ${task.description} - ${task.responsable} - ${task.status} - ${task.computer}`);
      });
    });
  });
});
