import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoryGroup, CategoryGroupSchema } from './entity/categoryGroup.entity';
import { Category, CategorySchema } from '../categories/entities/category.entity';
import { CategoryGroupsController } from './categoryGroup.controller';
import { CategoryGroupsService } from './categoryGroup.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CategoryGroup.name, schema: CategoryGroupSchema },
      { name: Category.name, schema: CategorySchema },
    ]),
  ],
  controllers: [CategoryGroupsController],
  providers: [CategoryGroupsService],
  exports: [CategoryGroupsService],
})
export class CategoryGroupsModule {}
