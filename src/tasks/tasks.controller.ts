import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { CreateTaskDto } from './dto/creat-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks.dto';
import { Task, TaskStatus } from './task.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Get()
  getTasks(@Query() filterDto:GetTasksFilterDto): Task[] {
    if(Object.keys(filterDto).length > 0){
      return this.taskService.getTasksWithFilters(filterDto)
    }else{
      return this.taskService.getAllTasks();
    }
  }

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): Task {
    const task = this.taskService.createTask(createTaskDto);
    return task;
  }

  @Get(':id')
  getSingleTask(@Param("id") id: string): Task {
    return this.taskService.getTask(id);
  }

  @Delete(':id')
  deleteTaskById(@Param('id') id:string):Task[] {
    return this.taskService.deleteTask(id);
  }

  @Patch(':id/status')
  updateTaskById(
    @Param('id') id:string,
    @Body('status') status:TaskStatus
  ):Task {
    return this.taskService.updateTask(id, status);
  }
}
