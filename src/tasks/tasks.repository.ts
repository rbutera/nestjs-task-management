import {CreateTaskDto} from './dto/create-task.dto'
import {Task} from './task.entity'
import {TaskStatus} from './task-status.enum'
import {Repository, EntityRepository} from 'typeorm'

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const {title, description} = createTaskDto
    const task = new Task()
    task.title = title
    task.description = description
    task.status = TaskStatus.OPEN
    return task.save()
  }
}