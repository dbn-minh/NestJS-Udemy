import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { TaskRepository } from './task.repository';
import { DataSource } from 'typeorm';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Task]), AuthModule],
  providers: [
    TasksService,
    {
      provide: TaskRepository,
      useFactory: (dataSource: DataSource) => {
        return new TaskRepository(dataSource);
      },
      inject: [DataSource],
    },
  ],
  controllers: [TasksController],
})
export class TasksModule {}
