import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoryGroup, CategoryGroupSchema } from './entity/categoryGroup.entity';
import { Category, CategorySchema } from '../categories/entities/category.entity';
import { CategoryGroupsController } from './categoryGroup.controller';
import { CategoryGroupsService } from './categoryGroup.service';
import { Budget, BudgetSchema } from 'src/budgets/entities/budget.entity';
import { Transaction, TransactionSchema } from 'src/transactions/entities/transaction.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CategoryGroup.name, schema: CategoryGroupSchema },
      { name: Category.name, schema: CategorySchema },
      { name: Budget.name, schema: BudgetSchema },
    ]),
  ],
  controllers: [CategoryGroupsController],
  providers: [CategoryGroupsService],
  exports: [CategoryGroupsService],
})
export class CategoryGroupsModule {}
