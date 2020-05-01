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
  ParseIntPipe,
} from '@nestjs/common'
import {TasksService} from './tasks.service'
import {TaskStatus} from './task-status.enum'
import {CreateTaskDto} from './dto/create-task.dto'
import {GetTasksFilterDto} from './dto/get-tasks-filter.dto'
import {isEmpty} from 'ramda'
import {TaskStatusValidationPipe} from './pipes/task-status-validation.pipe'
import {Task} from './task.entity'

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  // @Get()
  // getTasks(@Query(ValidationPipe) filterDto: GetTasksFilterDto): Task[] {
  //   if (!isEmpty(filterDto)) {
  //     return this.tasksService.getTasksWithFilter(filterDto)
  //   }

  //   return this.tasksService.getAllTasks()
  // }

  @Get('/:id')
  async getTask(@Param('id', ParseIntPipe) id: number): Promise<Task> {
    return this.tasksService.getTaskById(id)
  }

  @Delete('/:id')
  async deleteTask(@Param('id', ParseIntPipe) id: number): Promise<Task> {
    return this.tasksService.deleteTask(id)
  }

  // @Patch('/:id/status')
  // updateTaskStatus(
  //   @Param('id') id: string,
  //   @Body('status', TaskStatusValidationPipe) status: TaskStatus
  // ): Task {
  //   return this.tasksService.updateTaskStatus(id, status)
  // }

  @Post()
  @UsePipes(ValidationPipe)
  async createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksService.createTask(createTaskDto)
  }
}
