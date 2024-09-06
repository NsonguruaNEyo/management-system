/* eslint-disable prettier/prettier */
import { IsEmail, IsNotEmpty, IsOptional, IsString, isString, Matches, MaxLength, MinLength } from "class-validator";
import { Role } from "../../enum/role.enum";


export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    name:string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    @MinLength(8, {message: `Sorry you must put in 8 characters`})
    @MaxLength(16, {message: `password should not be more than 16 characters`})
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[^\da-zA-Z]).{8,}$/, {message: `password must contain at least One Uppercase, one number and one special key`})
    password: string;

    @IsOptional()
    role: Role
}
