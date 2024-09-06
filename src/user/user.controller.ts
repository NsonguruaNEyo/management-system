import {Controller,Get,Post,Body,Patch,Param,Delete,Req,Res,UseGuards,} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginDto } from './dto/login.dto';
import { Request, Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/guard/role.guard';
import { Role } from 'src/guard/role';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Post('login')
  signIn(@Body()payload:LoginDto, @Req()req:Request, @Res()res:Response) {
    return this.userService.signIn(payload, req, res);
  }

  @Post('logout')
  signout(@Req()req:Request, @Res()res:Response) {
    return this.userService.logout(req, res);
  }

  @Get()
  @UseGuards(AuthGuard(), RolesGuard)
  @Role('admin') 
  findAll(){
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}