import { IsString, IsDate, IsNotEmpty } from 'class-validator';
import { User } from 'src/users/entities/user.entity';

export class CreateBudgetDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  targetAmount: number;

  @IsDate()
  month: Date;

  @IsString()
  @IsNotEmpty()
  owner: User;
}
