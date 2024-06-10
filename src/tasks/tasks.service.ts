import { Injectable, NotFoundException, Query } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { Task } from './task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TaskRepository } from './task.repository';
// import { TaskRepository } from './task.repository';

@Injectable()
export class TasksService {
  // Inject the repository directly
  constructor(
    @InjectRepository(TaskRepository)
    private readonly taskRepository: TaskRepository,
  ) {}

  async getTaskById(id: number): Promise<Task | undefined> {
    const found = await this.taskRepository.findOne({
      where: { id },
    });
    if (!found) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return found;
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskRepository.createTask(createTaskDto);
  }

  async deleteTaskById(id: number): Promise<void> {
    const result = await this.taskRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    console.log(`Deleted task with ID ${id}`);
  }

  // deleteTaskById(id: number): void {
  //   const taskIndex = this.taskRepository.findIndex((task) => task.id === id);

  //   if (taskIndex === -1) {
  //     throw new NotFoundException(`Task with ID ${id} not found`);
  //   }
  //   this.taskRepository.splice(taskIndex, 1);
  // }

  // // Not actually delete the tasks, just not fetch the task with
  // // the given id
  // deleteTask(id: string): void {
  //   const found = this.getTaskById(id);
  //   this.tasks = this.tasks.filter((task) => task.id !== found.id);
  // }

  // updateTask(id: string, status: TaskStatus): Task {
  //   const getTask = this.getTaskById(id);
  //   getTask.status = status;
  //   return getTask;
  // }
}
