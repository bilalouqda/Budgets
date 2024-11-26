import { IsNotEmpty, IsEnum } from 'class-validator';
import { UserRole } from '../entities/user.entity';

export class UpdateUserRoleDto {
  @IsNotEmpty()
  @IsEnum(UserRole)
  role: UserRole;
}