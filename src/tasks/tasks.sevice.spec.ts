import { Test } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { TaskRepository } from './tasks.repository';
import { TaskStatus } from './task-status.enum';
import { NotFoundException } from '@nestjs/common';

const mockTasksRepository = () => ({
  getTasks: jest.fn(),
  findOneBy: jest.fn(),
});

const mockUser = {
  username: 'denys',
  id: '1',
  password: '1',
  tasks: [],
};

describe('TaskService', () => {
  let taskService: TasksService;
  let taskRepository;

  beforeEach(async () => {
    // initialize a NestJS module with TaskService and TaskRepository
    const module = await Test.createTestingModule({
      providers: [
        TasksService,
        { provide: TaskRepository, useFactory: mockTasksRepository },
      ],
    }).compile();

    taskService = module.get(TasksService);
    taskRepository = module.get(TaskRepository);
  });

  describe('getTasks', () => {
    it('calls TasksRepository.getTasks and returns the result', async () => {
      taskRepository.getTasks.mockResolvedValue('something');
      const result = await taskService.getTasks(null, mockUser);
      expect(result).toEqual('something');
    });
  });

  describe('getTaskById', () => {
    it('calls TasksRepository.findOneBy and returns the result', async () => {
      const mockTask = {
        title: 'test',
        description: 'test',
        id: 'test',
        status: TaskStatus.OPEN,
      };

      taskRepository.findOneBy.mockResolvedValue(mockTask);
      const result = await taskService.getTaskById('test', mockUser);
      expect(result).toEqual(mockTask);
    });

    it('calls TasksRepository.findOneBy and handles an error', async () => {
      taskRepository.findOneBy.mockResolvedValue(null);
      expect(taskService.getTaskById('test', mockUser)).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
