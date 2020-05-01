import {Injectable, NotFoundException} from '@nestjs/common'
import {Task, TaskStatus} from './task.model'
import {v1 as uuid} from 'uuid'
import {CreateTaskDto} from './dto/create-task.dto'
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
    const found = this.tasks.find(task => task.id === id)
    if (!found) {
      throw new NotFoundException(`A task with id ${id} was not found.`)
    }
    return found
  }

  deleteTask(id: string): void {
    const found = this.getTask(id)
    this.tasks = this.tasks.filter(task => task.id !== found.id)
  }

  updateTaskStatus(id: string, status: TaskStatus): Task {
    const task = this.getTask(id)
    task.status = status
    return task
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
