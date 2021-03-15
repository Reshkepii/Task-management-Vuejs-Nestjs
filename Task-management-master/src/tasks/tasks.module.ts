import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { TasksController } from './tasks.controller';

@Module({
  imports :[TypeOrmModule.forFeature([Task])],
  controllers: [TasksController]
})
export class TasksModule {}
