const db = require('../config/firestoreConfig');
const { getComputerName } = require('../utils/getComputerName');
const { addTasks, getTasks } = require('./firestoreService');

jest.mock('../config/firestoreConfig');
jest.mock('../utils/getComputerName');

describe('Firestore Service', () => {
  describe('addTasks', () => {
    it('should add tasks successfully', async () => {
      const tasks = [
        { description: 'Task 1', responsable: 'John', status: 'todo' },
        { description: 'Task 2', responsable: 'Jane', status: 'doing' },
      ];
      const mockTaskRef = {
        doc: jest.fn(() => ({
          set: jest.fn(),
        })),
      };
      db.collection.mockReturnValue(mockTaskRef);
      getComputerName.mockReturnValue('TestComputer');

      await addTasks(tasks);

      expect(db.collection).toHaveBeenCalledWith('tasks');
      expect(getComputerName).toHaveBeenCalled();
      expect(mockTaskRef.doc).toHaveBeenCalledTimes(2);
    });

    it('should handle errors during task addition', async () => {
      const tasks = [{ description: 'Task 1', responsable: 'John', status: 'todo' }];
      const mockSet = jest.fn(() => { throw new Error('Database error'); });
      const mockTaskRef = {
        doc: jest.fn(() => ({
          set: mockSet,
        })),
      };
      db.collection.mockReturnValue(mockTaskRef);
      
      try {
        await addTasks(tasks);
      } catch (error) {
        expect(error.message).toEqual('Database error');
      }
      expect(mockSet).toHaveBeenCalled();
    });
  });

  describe('getTasks', () => {
    it('should return tasks successfully', async () => {
      const mockTaskSnapshot = {
        docs: [
          { id: '1', data: jest.fn(() => ({ description: 'Task 1', responsable: 'John', status: 'todo' })) },
          { id: '2', data: jest.fn(() => ({ description: 'Task 2', responsable: 'Jane', status: 'doing' })) },
        ],
      };
      const mockTaskCollection = {
        get: jest.fn(() => Promise.resolve(mockTaskSnapshot)),
      };
      db.collection.mockReturnValue(mockTaskCollection);

      const result = await getTasks();

      expect(db.collection).toHaveBeenCalledWith('tasks');
      expect(mockTaskCollection.get).toHaveBeenCalled();
      expect(result).toEqual([
        { id: '1', description: 'Task 1', responsable: 'John', status: 'todo' },
        { id: '2', description: 'Task 2', responsable: 'Jane', status: 'doing' },
      ]);
    });

    it('should handle errors during task retrieval', async () => {
      db.collection.mockImplementation(() => {
        throw new Error('Database error');
      });

      try {
        await getTasks();
      } catch (error) {
        expect(error.message).toEqual('Database error');
      }
    });
  });
});
