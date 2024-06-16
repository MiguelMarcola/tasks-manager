const { addTasks, getTasks } = require('../services/firestoreService');
const { insertTasks, getAllTasks } = require('./taskController');

jest.mock('../services/firestoreService', () => ({
  addTasks: jest.fn(),
  getTasks: jest.fn(),
}));

describe('Task Controller', () => {
  describe('insertTasks', () => {
    it('should insert tasks successfully', async () => {
      const req = {
        body: [
          { description: 'Task 1', responsable: 'John', status: 'todo' },
          { description: 'Task 2', responsable: 'Jane', status: 'doing' },
        ],
      };
      const res = {
        status: jest.fn(() => res),
        send: jest.fn(),
      };

      await insertTasks(req, res);

      expect(addTasks).toHaveBeenCalledWith([
        { description: 'Task 1', responsable: 'John', status: 'todo' },
        { description: 'Task 2', responsable: 'Jane', status: 'doing' },
      ]);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith('Tasks inserted successfully.');
    });

    it('should handle errors during task insertion', async () => {
      const req = {
        body: [{ description: 'Task 1', responsable: 'John', status: 'todo' }],
      };
      const res = {
        status: jest.fn(() => res),
        send: jest.fn(),
      };
      addTasks.mockRejectedValue(new Error('Database error'));

      await insertTasks(req, res);

      expect(addTasks).toHaveBeenCalledWith([{ description: 'Task 1', responsable: 'John', status: 'todo' }]);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.send).toHaveBeenCalledWith('Error inserting tasks.');
    });
  });

  describe('getAllTasks', () => {
    it('should return all tasks', async () => {
      const req = {};
      const res = {
        status: jest.fn(() => res),
        json: jest.fn(),
      };
      const tasks = [{ id: '1', description: 'Task 1', responsable: 'John', status: 'todo' }];
      getTasks.mockResolvedValue(tasks);

      await getAllTasks(req, res);

      expect(getTasks).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(tasks);
    });
  });
});
