import { Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UsersEntity } from "./entities/users.entity";
import { Repository } from "typeorm";
import { UserResponseDto } from "./dtos/user-response-dto";
import { CreateUserDto } from "./dtos/create-user.dto";
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    //inyeccion de dependencias
    constructor(@InjectRepository(UsersEntity) private readonly usersRepository: Repository<UsersEntity>) { }

    //esta funcion es para convertir el objeto user a un objeto UserResponseDto
    private toResponseDto(user: UsersEntity): UserResponseDto {
        const { id, email, role, createdAt, updatedAt, isActive } = user;
        return { id, email, role, createdAt, updatedAt, isActive };
    }

    async create(dto: CreateUserDto): Promise<UserResponseDto> {

        //primero validamos que el usuario no exista
        const user = await this.usersRepository.findOneBy({ email: dto.email })

        if (user) {
            throw new Error('El usuario ya existe')
        }

        const newUser = this.usersRepository.create({
            ...dto,
            //hasehamos el passo
            password: await bcrypt.hash(dto.password, 10)
        });

        await this.usersRepository.save(newUser);

        return this.toResponseDto(newUser)

    }

}