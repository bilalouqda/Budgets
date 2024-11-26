import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Category } from 'src/categories/entities/category.entity';
import { User } from 'src/users/entities/user.entity';
import { Transaction } from 'src/transactions/entities/transaction.entity';

export type BudgetDocument = Budget & Document;

@Schema({ toJSON: { virtuals: true }, toObject: { virtuals: true } })
export class Budget {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  month: Date;

  @Prop({ default: 0 })
  targetAmount: number;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  owner: User | Types.ObjectId;
}

export const BudgetSchema = SchemaFactory.createForClass(Budget);

BudgetSchema.virtual('categories', {
  ref: 'Category',
  localField: '_id',
  foreignField: 'budget'
});

BudgetSchema.virtual('transactions', {
  ref: 'Transaction',
  localField: '_id',
  foreignField: 'budget'
});