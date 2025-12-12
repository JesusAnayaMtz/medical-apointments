import { UserRole } from "../enums/user-role.enum";

export class UserResponseDto {
    id: string;
    email: string;
    role: UserRole;
    createdAt: Date;
    updatedAt: Date;
    isActive: boolean;
}