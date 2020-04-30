import {Injectable} from '@nestjs/common'
import {Task, TaskStatus} from './task.model'
import {v1 as uuid} from 'uuid'
import {CreateTaskDto} from './dto/create-task.dto'
import {UpdateTaskStatusDto} from './dto/update-task-status.dto'
import {GetTasksFilterDto} from './dto/get-tasks-filter.dto'
import {contains} from 'ramda'

@Injectable()
export class TasksService {
  private tasks: Task[] = []

  getAllTasks(): Task[] {
    return this.tasks
  }

  getTasksWithFilter(filterDto: GetTasksFilterDto): Task[] {
    const {status, search} = filterDto
    const containsSearchTerm = contains(search)
    return this.tasks.filter(
      task =>
        (status && task.status === status) ||
        (search &&
          (containsSearchTerm(task.description) ||
            containsSearchTerm(task.title)))
    )
  }

  getTask(id: string): Task {
    const [result] = this.tasks.filter(task => task.id === id)
    return result
  }

  deleteTask(id: string): void {
    this.tasks = this.tasks.filter(task => task.id !== id)
  }

  updateTaskStatus(id: string, updateTaskStatusDto: UpdateTaskStatusDto): Task {
    const {status} = updateTaskStatusDto
    this.tasks = this.tasks.map(task => ({
      ...task,
      status: task.id === id ? status : task.status,
    }))

    const [updated] = this.tasks.filter(task => task.id === id)
    return updated
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    const {title, description} = createTaskDto

    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    }

    this.tasks = [...this.tasks, task]

    return task
  }
}
