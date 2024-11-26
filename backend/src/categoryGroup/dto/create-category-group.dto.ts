import { IsString, IsNumber, IsBoolean, IsNotEmpty } from 'class-validator';
import { Types } from 'mongoose';

export class CreateCategoryGroupDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  budget: Types.ObjectId;

  @IsString()
  @IsNotEmpty()
  category: Types.ObjectId;

  @IsNumber()
  allocated: number;

  @IsNumber()
  spent: number;

  @IsNumber()
  order: number;

  @IsBoolean()
  isHidden: boolean;
}