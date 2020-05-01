import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'
import {TasksService} from './tasks.service'
import {Task, TaskStatus} from './task.model'
import {CreateTaskDto} from './dto/create-task.dto'
import {GetTasksFilterDto} from './dto/get-tasks-filter.dto'
import {isEmpty} from 'ramda'
import {TaskStatusValidationPipe} from './pipes/task-status-validation.pipe'

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getTasks(@Query(ValidationPipe) filterDto: GetTasksFilterDto): Task[] {
    if (!isEmpty(filterDto)) {
      return this.tasksService.getTasksWithFilter(filterDto)
    }

    return this.tasksService.getAllTasks()
  }

  @Get('/:id')
  getTask(@Param('id') id: string): Task {
    return this.tasksService.getTask(id)
  }

  @Delete('/:id')
  deleteTask(@Param('id') id: string): void {
    return this.tasksService.deleteTask(id)
  }

  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id') id: string,
    @Body('status', TaskStatusValidationPipe) status: TaskStatus
  ): Task {
    return this.tasksService.updateTaskStatus(id, status)
  }

  @Post()
  @UsePipes(ValidationPipe)
  createTask(@Body() createTaskDto: CreateTaskDto): Task {
    return this.tasksService.createTask(createTaskDto)
  }
}
