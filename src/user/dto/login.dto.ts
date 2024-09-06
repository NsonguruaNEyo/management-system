import { isNotEmpty, IsNotEmpty, IsString } from "class-validator";
// import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

export class LoginDto{
    @IsNotEmpty()
    @IsString()
    email:string;

    @IsNotEmpty()
    @IsString()
    password: string
}