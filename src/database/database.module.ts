/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from 'migration/typeorm';

@Module({
    imports: [
        ConfigModule.forRoot({isGlobal:true}),
        TypeOrmModule.forRoot(dataSourceOptions)
    ],
})
export class DatabaseModule {}
