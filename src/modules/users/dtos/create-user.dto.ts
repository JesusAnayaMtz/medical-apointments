import { IsBoolean, IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from "class-validator";
import { UserRole } from "../enums/user-role.enum";

export class CreateUserDto {

    @IsString()
    @MinLength(3)
    @MaxLength(255)
    @IsNotEmpty()
    name: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @MinLength(8)
    @IsNotEmpty()
    password: string;

    @IsString()
    @IsEnum(UserRole)
    @IsNotEmpty()
    role: UserRole;

    @IsBoolean()
    @IsOptional()
    isActive: boolean;
}