import { IsString, IsNumber, IsNotEmpty, Min } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  budget: string;

  @IsNumber()
  @Min(0)
  totalAllocated: number;

  @IsNumber()
  @Min(0)
  totalSpent: number;
}
