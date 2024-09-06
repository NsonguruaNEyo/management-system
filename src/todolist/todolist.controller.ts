import {Controller,Get,Post,Body,Patch,Param,Delete, Req, UseGuards} from '@nestjs/common';
import { TodolistService } from './todolist.service';
import { CreateTodolistDto } from './dto/create-todolist.dto';
import { UpdateTodolistDto } from './dto/update-todolist.dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/user/Entity/user.entity';
import { Request } from 'express';
import { RolesGuard } from 'src/guard/role.guard';
import { Role } from 'src/guard/role';

@Controller('todolist')
export class TodolistController {
  constructor(private readonly todolistService: TodolistService) {}

  @Post()
  @UseGuards(AuthGuard(), RolesGuard)

  @Role('user', 'admin')
  create(@Body() createTodolistDto: CreateTodolistDto, @Req() req: Request) {
    return this.todolistService.create(createTodolistDto, req.user as User);
  }
  
  @Get()
  findAll() {
    return this.todolistService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.todolistService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTodolistDto: UpdateTodolistDto,
  ) {
    return this.todolistService.update(+id, updateTodolistDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.todolistService.remove(+id);
  }
}