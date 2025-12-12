import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { UserRole } from "../enums/user-role.enum";

@Entity('users')
export class UsersEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: false, nullable: false, type: 'varchar', length: 255 })
    name: string;

    @Column({ unique: false, nullable: false, type: 'varchar', length: 255 })
    email: string;

    @Column({ nullable: false, type: 'varchar', length: 255 })
    password: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @Column({ nullable: false, type: 'enum', enum: UserRole })
    role: UserRole;

    @Column({ nullable: false, type: 'boolean', default: true })
    isActive: boolean;
}