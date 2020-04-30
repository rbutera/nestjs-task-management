import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  Query,
} from '@nestjs/common'
import {TasksService} from './tasks.service'
import {Task} from './task.model'
import {CreateTaskDto} from './dto/create-task.dto'
import {UpdateTaskStatusDto} from './dto/update-task-status.dto'
import {GetTasksFilterDto} from './dto/get-tasks-filter.dto'
import {isEmpty} from 'ramda'

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getTasks(@Query() filterDto: GetTasksFilterDto): Task[] {
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
    @Body() updateTaskStatusDto: UpdateTaskStatusDto
  ): Task {
    return this.tasksService.updateTaskStatus(id, updateTaskStatusDto)
  }

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): Task {
    return this.tasksService.createTask(createTaskDto)
  }
}
