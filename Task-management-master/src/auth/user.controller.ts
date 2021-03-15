import { Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Controller('user')
export class UserController {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ){}

    @Get()
    getAll(): Promise<User[]>{
        return this.userRepository.find();
    }

    @Get('/:id')
    async getUserById(@Param('id', ParseIntPipe) id: number): Promise<User>{
        const found =  await this.userRepository.findOne(id);

        if(!found){
            throw new NotFoundException(`User with "${id}" not found`);
        }
        return found;
    }

    @Post()
    @UsePipes(ValidationPipe)
    createUser(@Body() useri: User) {
        return this.userRepository.save(useri);
    }

    @Delete('/:id')
    async deleteUser(@Param('id', ParseIntPipe) id: number) {
        const result = await this.userRepository.delete(id);
        
        if(result.affected === 0){
            throw new NotFoundException(`Task with "${id}" not found`);
        }

        return result;
    }


    @Put('/:id')
    updateTask(@Param('id',ParseIntPipe) id: number, @Body() useri: User){
        return this.userRepository.update(id,useri);
    }
}
