/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TodolistModule } from './todolist/todolist.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/Entity/user.entity';

@Module({
  imports: [
   UserModule,
   TodolistModule,
    DatabaseModule,
    ConfigModule.forRoot({
      isGlobal:true,
      
  }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
