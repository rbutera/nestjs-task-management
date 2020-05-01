import {TaskRepository} from './tasks.repository'
import {Injectable, NotFoundException} from '@nestjs/common'
import {TaskStatus} from './task-status.enum'
import {CreateTaskDto} from './dto/create-task.dto'
import {GetTasksFilterDto} from './dto/get-tasks-filter.dto'
import {contains} from 'ramda'
import {InjectRepository} from '@nestjs/typeorm'
import {Task} from './task.entity'

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository
  ) {}
  // private tasks: Task[] = []
  // getAllTasks(): Task[] {
  //   return this.tasks
  // }
  // getTasksWithFilter(filterDto: GetTasksFilterDto): Task[] {
  //   const {status, search} = filterDto
  //   const containsSearchTerm = contains(search)
  //   return this.tasks.filter(
  //     task =>
  //       (status && task.status === status) ||
  //       (search &&
  //         (containsSearchTerm(task.description) ||
  //           containsSearchTerm(task.title)))
  //   )
  // }

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

  // updateTaskStatus(id: string, status: TaskStatus): Task {
  //   const task = this.getTask(id)
  //   task.status = status
  //   return task
  // }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskRepository.createTask(createTaskDto)
  }
}
