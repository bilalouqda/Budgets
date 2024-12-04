import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Transaction, TransactionSchema } from './entities/transaction.entity';
import { TransactionsController } from './transactions.controller';
import { TransactionsService } from './transactions.service';
import { CategoryGroup, CategoryGroupSchema } from 'src/categoryGroup/entity/categoryGroup.entity';
import { Category, CategorySchema } from 'src/categories/entities/category.entity';
import { CategoryGroupsService } from 'src/categoryGroup/categoryGroup.service';
import { Budget, BudgetSchema } from 'src/budgets/entities/budget.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Transaction.name, schema: TransactionSchema },
      { name: CategoryGroup.name, schema: CategoryGroupSchema },
      { name: Category.name, schema: CategorySchema },
      { name: Budget.name, schema: BudgetSchema },    
    ]),
  ],
  controllers: [TransactionsController],
  providers: [TransactionsService, CategoryGroupsService],
  exports: [TransactionsService],
})
export class TransactionsModule {}
