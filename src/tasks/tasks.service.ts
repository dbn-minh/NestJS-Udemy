import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTaskById(id: string): Task {
    const task = this.tasks.find((task) => task.id === id);
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return task;
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;

    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task);
    return task;
  }

  // deleteTaskById(id: string): void {
  //   const taskIndex = this.tasks.findIndex((task) => task.id === id);

  //   if (taskIndex === -1) {
  //     throw new NotFoundException(`Task with ID ${id} not found`);
  //   }
  //   this.tasks.splice(taskIndex, 1);
  // }

  // Not actually delete the tasks, just not fetch the task with
  // the given id
  deleteTask(id: string): void {
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }

  updateTask(id: string, status: TaskStatus): Task {
    const getTask = this.getTaskById(id);
    getTask.status = status;
    return getTask;
  }
}
