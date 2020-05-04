import {User} from './../auth/user.entity'
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

  async getTasks(filterDto: GetTasksFilterDto, user: User): Promise<Task[]> {
    return this.taskRepository.getTasks(filterDto, user)
  }

  async getTaskById(id: number, user: User): Promise<Task> {
    const found = await this.taskRepository.findOne({
      where: {id, userId: user.id},
    })
    if (!found) {
      throw new NotFoundException(`A task with id ${id} was not found.`)
    }
    return found
  }

  async deleteTask(id: number, user: User): Promise<Task> {
    const found = await this.getTaskById(id, user)
    return this.taskRepository.remove(found)
  }

  async updateTaskStatus(
    id: number,
    status: TaskStatus,
    user: User
  ): Promise<Task> {
    const task = await this.getTaskById(id, user)
    task.status = status
    return task.save()
  }

  async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    return this.taskRepository.createTask(createTaskDto, user)
  }
}
