import {TaskRepository} from './tasks.repository'
import {Injectable, NotFoundException} from '@nestjs/common'
import {TaskStatus} from './task-status.enum'
import {CreateTaskDto} from './dto/create-task.dto'
import {GetTasksFilterDto} from './dto/get-tasks-filter.dto'
import {InjectRepository} from '@nestjs/typeorm'
import {Task} from './task.entity'

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository
  ) {}

  async getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
    return this.taskRepository.getTasks(filterDto)
  }

  async getTaskById(id: number): Promise<Task> {
    const found = await this.taskRepository.findOne(id)
    if (!found) {
      throw new NotFoundException(`A task with id ${id} was not found.`)
    }
    return found
  }

  async deleteTask(id: number): Promise<Task> {
    const found = await this.getTaskById(id)
    return this.taskRepository.remove(found)
  }

  async updateTaskStatus(id: number, status: TaskStatus): Promise<Task> {
    const task = await this.getTaskById(id)
    task.status = status
    return task.save()
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskRepository.createTask(createTaskDto)
  }
}
