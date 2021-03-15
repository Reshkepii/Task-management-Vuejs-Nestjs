import { Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { Task } from './task.entity';

@Controller('tasks')
export class TasksController {
    constructor (
        @InjectRepository(Task)
        private taskRepository: Repository<Task>
    ){}
    
    @Get()
    async getAll(): Promise<Task[]>{
        const all = await  this.taskRepository.find();
        return all;

    }
    
    @Get('/:id')
    async getTaskById(@Param('id', ParseIntPipe)id: number): Promise<Task> {
        const found =  await  this.taskRepository.findOne(id);

        if(!found){
            throw new NotFoundException(`Task with "${id}" not found`);
        }
        return found;
    }
    
    @Post()
    @UsePipes(ValidationPipe)
    createTask(@Body() model: Task){
        return this.taskRepository.save(model);
    }

    @Delete('/:id')
    async deleteTask(@Param('id', ParseIntPipe) id: number){
        const result = await this.taskRepository.delete(id);

        if(result.affected === 0){
            throw new NotFoundException(`Task with "${id}" not found`);
        }

        return result;
    }


    @Put('/:id')
    async updateTask(@Param('id',ParseIntPipe) id: number, @Body() model: Task):Promise<UpdateResult>{
        const result = await this.taskRepository.update(id,model);
        if(result.affected === 0){
            throw new NotFoundException(`Task with "${id}" not found`);
        }

        return result;
    }

    
}
