import { CategoryGroup } from './../../categoryGroup/entity/categoryGroup.entity';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Budget } from 'src/budgets/entities/budget.entity';

export type TransactionDocument = Transaction & Document;

@Schema()
export class Transaction {
  @Prop({ required: true, type: Number })
  amount: number;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  date: Date;

  @Prop({ required: true })
  type: string;

  @Prop({ type: Types.ObjectId, ref: 'CategoryGroup', required: true })
  categoryGroup: CategoryGroup;
  
  @Prop({ type: Types.ObjectId, ref: 'Budget', required: true })
  budget: Budget;

}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);


// @Prop({ default: false })
// isReconciled: boolean;