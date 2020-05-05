import {TaskRepository} from './tasks.repository'
import {TaskStatus} from './task-status.enum'
import {Test, TestingModule} from '@nestjs/testing'
import {TasksController} from './tasks.controller'
import {TasksService} from './tasks.service'

import {GetTasksFilterDto} from './dto/get-tasks-filter.dto'
import {User} from 'src/auth/user.entity'

const mockUser: User = {
  username: 'tester',
  id: 2,
  password: 'test',
  salt: 'test',
  tasks: [],
  validatePassword: jest.fn(),
  save: jest.fn(),
  hasId: jest.fn(),
  remove: jest.fn(),
  reload: jest.fn(),
}

describe('Tasks Controller', () => {
  let controller: TasksController
  let service: TasksService
  let repository: TaskRepository

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [TasksService, TaskRepository],
    }).compile()

    controller = module.get<TasksController>(TasksController)
    service = module.get<TasksService>(TasksService)
    repository = module.get<TaskRepository>(TaskRepository)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
    expect(service).toBeDefined()
  })

  describe('getTasks', () => {
    it('should be defined', () => {
      expect(controller.getTasks).toBeDefined()
    })

    it('should call the service getTasks method', async () => {
      const response = ['foo']
      jest.spyOn(service, 'getTasks').mockResolvedValue(response)
      const filterDto: GetTasksFilterDto = {
        search: 'foo',
        status: TaskStatus.OPEN,
      }
      const result = await controller.getTasks(filterDto, mockUser)
      expect(service.getTasks).toHaveBeenCalledWith(filterDto, mockUser)
    })
  })
  describe('getTask', () => {
    it('should be defined', () => {
      expect(controller.getTask).toBeDefined()
    })

    it('should call the service getTaskById method', async () => {
      const response = {title: 'foo', id: 1337, user: mockUser}
      jest.spyOn(service, 'getTaskById').mockResolvedValue({})
      const result = await controller.getTask(1337, mockUser)
      expect(service.getTaskById).toHaveBeenCalledWith(1337, mockUser)
    })
  })
  describe('deleteTask', () => {
    it('should be defined', () => {
      expect(controller.deleteTask).toBeDefined()
    })

    it('should call the service deleteTask method', async () => {
      const input = {}
      const result = await controller.deleteTask(input, mockUser)
      expect(service.deleteTask).toHaveBeenCalledWith(input, mockUser)
    })
  })
  describe('updateTaskStatus', () => {
    it('should be defined', () => {
      expect(controller.updateTaskStatus).toBeDefined()
    })

    it('should call the service updateTaskStatus method', async () => {
      const input = {}
      const result = await controller.updateTaskStatus(input, mockUser)
      expect(service.updateTaskStatus).toHaveBeenCalledWith(input, mockUser)
    })
  })
  describe('createTask', () => {
    it('should be defined', () => {
      expect(controller.createTask).toBeDefined()
    })

    it('should call the service createTask method', async () => {
      const input = {}
      const result = await controller.createTask(input, mockUser)
      expect(service.createTask).toHaveBeenCalledWith(input, mockUser)
    })
  })
})
