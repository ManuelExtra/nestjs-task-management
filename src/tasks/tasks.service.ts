import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import {v4 as uuid} from 'uuid'
import { CreateTaskDto } from './dto/creat-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks.dto';

@Injectable()
export class TasksService {
    private tasks: Task[] = [];

    getAllTasks():Task[]{
        return this.tasks;
    }

    getTasksWithFilters(filterDto:GetTasksFilterDto):Task[]{
        const {status, search} = filterDto;

        let tasks = this.getAllTasks();

        if(status){
            tasks = tasks.filter(task => task.status === status);
        }

        if(search){
            tasks = tasks.filter(task => {
                if(task.title.includes(search) || task.description.includes(search)){
                    return true;
                }

                return false;
            })
        }
        return tasks;
    }

    createTask(createTaskDto: CreateTaskDto){
        const {title, description} = createTaskDto;
        const task: Task = {
            id: uuid(),
            title,
            description,
            status: TaskStatus.OPEN
        }

        this.tasks.push(task);
        return task;
    }

    getTask(id: string):Task{
        return this.tasks.find((task) => task.id === id);
    }

    deleteTask(id: string):Task[]{
        this.tasks = this.tasks.filter(task => task.id !== id);
        return this.tasks;
    }

    updateTask(id: string, status: TaskStatus): Task{
        const task = this.getTask(id);
        task.status = status;
        return task;
    }
}
