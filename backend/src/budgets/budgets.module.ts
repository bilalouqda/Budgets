import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Budget, BudgetSchema } from './entities/budget.entity';
import { BudgetsController } from './budgets.controller';
import { BudgetsService } from './budgets.service';
import { UserSchema } from 'src/users/entities/user.entity';


@Module({
  imports: [
    MongooseModule.forFeature([ { name: 'Budget', schema: BudgetSchema },
      { name: 'User', schema: UserSchema }]),
  ],
  controllers: [BudgetsController],
  providers: [BudgetsService],
  exports: [BudgetsService],
})
export class BudgetsModule {}