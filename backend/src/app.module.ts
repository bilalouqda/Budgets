import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { CategoriesModule } from './categories/categories.module';
import { TransactionsModule } from './transactions/transactions.module';
import * as dotenv from 'dotenv';
import { BudgetsModule } from './budgets/budgets.module';
import { CategoryGroupsModule } from './categoryGroup/categoryGroup.module';

dotenv.config();

function validateConfig() {
  const requiredEnvVars = ['MONGODB_URI', 'MONGODB_DATABASE'];
  for (const envVar of requiredEnvVars) {
    if (!process.env[envVar]) {
      throw new Error(`Missing required environment variable: ${envVar}`);
    }
  }
}

validateConfig();

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGODB_URI, {
      dbName: process.env.MONGODB_DATABASE,
      connectionFactory: (connection) => {
        connection.plugin(require('mongoose-autopopulate'));
        connection.set('toJSON', { virtuals: true });
        connection.set('toObject', { virtuals: true });
        return connection;
      },
    }),
    UsersModule,
    BudgetsModule,
    CategoriesModule,
    CategoryGroupsModule,
    TransactionsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}