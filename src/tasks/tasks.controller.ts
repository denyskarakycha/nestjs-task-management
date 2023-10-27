import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { ITask } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './task.model';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Get()
  getAllTasks(): ITask[] {
    return this.taskService.getAllTasks();
  }

  @Get('/single/:id')
  getTask(@Param('id') id: string): ITask {
    return this.taskService.getTaskById(id);
  }

  @Delete('/single/:id')
  deleteTaskById(@Param('id') id: string): void {
    return this.taskService.deleteTaskById(id);
  }

  @Patch('/single/:id/status')
  updateTaskStatus(
    @Param('id') id: string,
    @Body('status') status: TaskStatus,
  ): ITask {
    return this.taskService.updateTaskStatus(id, status);
  }

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): ITask {
    return this.taskService.createTask(createTaskDto);
  }
}
